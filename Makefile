.DEFAULT_GOAL := all

.PHONY: all update frontend-update backend-update build frontend-check frontend-build backend-build publish backend-publish backend-publish-build backend-deploy guard-release-versions

IMAGE = europe-north2-docker.pkg.dev/altshift-main/images/altshift-www:latest

# The two Cloud Run services the one image is deployed to. www.altshift.se is served by
# Firebase Hosting, which reaches a service over its run.app URL and cannot rewrite to
# europe-north2 -- so the europe-north1 service is the one visitors actually get, and the
# europe-north2 one behind the load balancer is what it is being moved off. Both answer for
# the name until DNS says otherwise, so both are deployed: pushing the image does not make
# Cloud Run take it, and deploying only the first leaves the public site on the old one.
SERVICES = altshift-www:europe-north2 altshift-www-eun1:europe-north1


backend-build:
	@echo "[backend] Building..."
	cd backend && go generate && GOOS=linux go build -a -ldflags="-s -w -buildid=" -installsuffix cgo -o ../service

frontend-check:
	@echo "[frontend] Type checking..."
	cd frontend && go tool tsgo --noEmit -p tsconfig.json

frontend-build: frontend-check
	@echo "[frontend] Building..."
	cd frontend && go tool web_build --preload-fonts '^fonts/mulish-.*\.woff2$$'

build: frontend-build backend-build

backend-update:
	@echo "[backend] Updating..."
	cd backend && gm

frontend-update:
	@echo "[frontend] Updating..."
	cd frontend && ncu --upgrade && npm update

update: frontend-update backend-update

all: update build

backend-publish-build:
	@echo "[backend] Building for publish..."
	cd backend && podman build . --tag altshift-www

# What is published is built from releases of my modules, never from a commit under test (a
# pseudo-version): https://wiki.vvvp.se/?page=go-module-versions. GOWORK=off reads the module graph the
# image is built from, and a failing go list fails the guard rather than passing it. A replaced module
# is checked as what replaces it: a directory in the repo has no version, and a replace onto a
# pseudo-version is caught.
guard-release-versions:
	@cd backend && modules=$$(GOWORK=off go list -m -f '{{with .Replace}}{{.Path}} {{.Version}}{{else}}{{.Path}} {{.Version}}{{end}}' all) && \
	test_versions=$$(printf '%s\n' "$$modules" | grep -E '^github\.com/(Motmedel|altshiftab|vphpersson|intilgroup)/[^ ]* v[^ ]*[0-9]{14}-[0-9a-f]{12}$$' || true) && \
	if [ -n "$$test_versions" ]; then printf '[deploy] Built from test versions of my modules; release them first:\n%s\n' "$$test_versions" >&2; exit 1; fi

backend-publish: guard-release-versions build backend-publish-build
	@echo "[backend] Publishing..."
	podman tag altshift-www $(IMAGE) && podman push $(IMAGE)

publish: backend-publish

backend-deploy: guard-release-versions backend-publish
	@echo "[backend] Deploying to Cloud Run..."
	@for service in $(SERVICES); do \
		name=$${service%%:*}; region=$${service##*:}; \
		echo "[backend] Deploying $$name to $$region..."; \
		gcloud run deploy $$name \
			--image=$(IMAGE) \
			--region=$$region \
			--project=altshift-main \
			--platform=managed \
			--quiet || exit 1; \
	done
