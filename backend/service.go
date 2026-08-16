package main

import (
	"fmt"
	"log/slog"
	"maps"
	"slices"

	motmedelEnv "github.com/Motmedel/utils_go/pkg/env"
	motmedelErrors "github.com/Motmedel/utils_go/pkg/errors"
	motmedelService "github.com/Motmedel/utils_go/pkg/http/service"
	"github.com/Motmedel/utils_go/pkg/http/service/service_config"
	motmedelHttpTypes "github.com/Motmedel/utils_go/pkg/http/types"
	motmedelHttpLogger "github.com/Motmedel/utils_go/pkg/log/http_logger"
	"github.com/Motmedel/utils_go/pkg/log/http_logger/http_logger_config"
)

func main() {
	logger := motmedelHttpLogger.New(http_logger_config.WithGcp(true))
	slog.SetDefault(logger.Logger)

	domain := motmedelEnv.GetEnvWithDefault("DOMAIN", "localhost")
	port := motmedelEnv.GetEnvWithDefault("PORT", "8080")

	httpService, err := motmedelService.New(
		service_config.WithHost(domain),
		service_config.WithAddress(fmt.Sprintf(":%s", port)),
		service_config.WithProfile(service_config.ProfilePublicWeb),
		service_config.WithEndpoints(staticContentEndpoints...),
		// The document served at "/" is served at each of the routes the frontend routes on its
		// own, so that a request for one arrives at the document that routes it. They are taken in
		// order, so that the sitemap made of them is the same from one start to the next.
		service_config.WithDuplicatedEndpoint("/", slices.Sorted(maps.Values(routes))...),
		service_config.WithTrustedTypes(litHtmlTrustedTypesPolicy),
		// The load balancer speaks prior-knowledge unencrypted HTTP/2 to the backend, which the
		// standard library serves alongside HTTP/1.
		service_config.WithUnencryptedHttp2(true),
		// The languages a vulnerability is preferably reported in; the rest of what the security.txt
		// says, and which of its forms is served, follows from the domain.
		service_config.WithSecurityTxtContent(
			&motmedelHttpTypes.SecurityTxt{PreferredLanguages: []string{"sv", "en"}},
		),
	)
	if err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when creating the http service.",
			motmedelErrors.New(fmt.Errorf("service new: %w", err), domain, port),
		)
	}
	if httpService == nil {
		logger.FatalWithExitingMessage("Nil http service.", nil)
	}

	// Serving stops when the process is asked to, letting the requests being handled finish: an
	// instance is replaced whenever a revision is, and a request killed midway leaves whatever it
	// was doing half done.
	if err := httpService.Serve(); err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when serving.",
			motmedelErrors.New(fmt.Errorf("service serve: %w", err)),
		)
	}
}
