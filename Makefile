.DEFAULT_GOAL := all

.PHONY: all update frontend-update backend-update build frontend-check frontend-build backend-build publish backend-publish backend-publish-build backend-deploy


backend-build:
	@echo "[backend] Building..."
	cd backend && go generate && GOOS=linux go build -a -ldflags="-s -w -buildid=" -installsuffix cgo -o ../service

frontend-check:
	@echo "[frontend] Type checking..."
	cd frontend && go tool tsgo --noEmit -p tsconfig.json

frontend-build: frontend-check
	@echo "[frontend] Building..."
	cd frontend && go tool web_build -preload-fonts '^fonts/mulish-.*\.woff2$$'

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

backend-publish: build backend-publish-build
	@echo "[backend] Publishing..."
	podman tag altshift-www europe-north2-docker.pkg.dev/altshift-main/images/altshift-www:latest \
		&& podman push europe-north2-docker.pkg.dev/altshift-main/images/altshift-www:latest

publish: backend-publish

backend-deploy: backend-publish
	@echo "[backend] Deploying to Cloud Run..."
	gcloud run deploy altshift-www \
		--image=europe-north2-docker.pkg.dev/altshift-main/images/altshift-www:latest \
		--region=europe-north2 \
		--project=altshift-main \
		--platform=managed \
		--quiet
