package main

import (
	"fmt"
	"log/slog"
	"maps"
	"net/http"
	"net/url"

	motmedelEnv "github.com/Motmedel/utils_go/pkg/env"
	motmedelErrors "github.com/Motmedel/utils_go/pkg/errors"
	altshiftGcpUtilsHttp "github.com/altshiftab/gcp_utils/pkg/http"
	"github.com/altshiftab/gcp_utils/pkg/http/types/service"
	"github.com/altshiftab/gcp_utils/pkg/http/types/service/service_config"
	gcpUtilsLogger "github.com/altshiftab/gcp_utils/pkg/types/logger"
)

func main() {
	logger := gcpUtilsLogger.New()
	slog.SetDefault(logger.Logger)

	domain := motmedelEnv.GetEnvWithDefault("DOMAIN", "localhost")
	port := motmedelEnv.GetEnvWithDefault("PORT", "8080")

	httpService, err := service.New(
		domain,
		port,
		service_config.WithStaticContentEndpoints(staticContentEndpoints),
		service_config.WithPublic(true),
	)
	if err != nil {
		logger.FatalWithExitingMessage("An error occurred when creating the http service.", err)
	}
	if httpService == nil {
		logger.FatalWithExitingMessage("Nil http service.", nil)
	}

	mux := httpService.Mux
	if mux == nil {
		logger.FatalWithExitingMessage("Nil mux", nil)
	}

	if err := altshiftGcpUtilsHttp.PatchTrustedTypes(mux, litHtmlTrustedTypesPolicy, webpackTrustedTypesPolicy); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when patching trusted types.",
			motmedelErrors.NewWithTrace(
				fmt.Errorf("patch trusted types: %w", err),
				mux, litHtmlTrustedTypesPolicy, webpackTrustedTypesPolicy,
			),
		)
	}

	indexEndpointSpecification := mux.Get("/", http.MethodGet)
	if indexEndpointSpecification == nil {
		logger.FatalWithExitingMessage(
			"The index endpoint specification is nil.",
			nil,
		)
	}

	for route := range maps.Values(routes) {
		specification := *indexEndpointSpecification
		specification.Path = route

		mux.Add(&specification)
	}

	// service.New generates the sitemap before the document routes above are
	// registered, so it would only list "/". Regenerate it now that every route
	// is present; mux.Add upserts, so the sitemap and robots.txt are replaced.
	scheme := "https"
	if domain == "localhost" {
		scheme = "http"
	}
	baseUrl := &url.URL{Scheme: scheme, Host: domain}
	if err := altshiftGcpUtilsHttp.PatchCrawlable(mux, baseUrl, mux.GetDocumentEndpointSpecifications()); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when patching crawlable.",
			motmedelErrors.NewWithTrace(fmt.Errorf("patch crawlable: %w", err), mux, baseUrl),
		)
	}

	httpServer := httpService.Server
	if httpServer == nil {
		logger.FatalWithExitingMessage("Nil http server.", nil)
	}

	if err := httpServer.ListenAndServe(); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when listening and serving.",
			motmedelErrors.NewWithTrace(fmt.Errorf("http server listen and serve: %w", err), httpServer),
		)
	}
}
