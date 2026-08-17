package main

import (
	"fmt"
	"log/slog"
	"maps"
	"slices"

	altshiftEnv "github.com/altshiftab/utils_go/pkg/env"
	altshiftErrors "github.com/altshiftab/utils_go/pkg/errors"
	altshiftService "github.com/altshiftab/utils_go/pkg/http/service"
	"github.com/altshiftab/utils_go/pkg/http/service/service_config"
	altshiftHttpTypes "github.com/altshiftab/utils_go/pkg/http/types"
	altshiftHttpLogger "github.com/altshiftab/utils_go/pkg/log/http_logger"
	"github.com/altshiftab/utils_go/pkg/log/http_logger/http_logger_config"
)

func main() {
	logger := altshiftHttpLogger.New(http_logger_config.WithGcp(true))
	slog.SetDefault(logger.Logger)

	domain := altshiftEnv.GetEnvWithDefault("DOMAIN", "localhost")
	port := altshiftEnv.GetEnvWithDefault("PORT", "8080")

	httpService, err := altshiftService.New(
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
			&altshiftHttpTypes.SecurityTxt{PreferredLanguages: []string{"sv", "en"}},
		),
	)
	if err != nil {
		logger.FatalWithExitingMessage(
			"An error occurred when creating the http service.",
			altshiftErrors.New(fmt.Errorf("service new: %w", err), domain, port),
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
			altshiftErrors.New(fmt.Errorf("service serve: %w", err)),
		)
	}
}
