package main

import (
	"net/http"
	"testing"

	"github.com/altshiftab/utils_go/pkg/http/mux/types/forwarded_headers"
	"github.com/altshiftab/utils_go/pkg/http/service/service_config"
)

// The client of a request through Firebase Hosting, which arrives as `<client>,<Firebase edge>`, is
// the entry before the edge's; a header naming fewer entries names no client.
func TestForwardedForOption(t *testing.T) {
	t.Parallel()

	config := service_config.New(forwardedForOption())
	if config == nil {
		t.Fatal("nil config")
	}

	testCases := []struct {
		name           string
		forwardedFor   string
		expectedClient string
	}{
		{name: "through firebase hosting", forwardedFor: "203.0.113.7,66.249.93.77", expectedClient: "203.0.113.7"},
		{name: "direct call naming a client", forwardedFor: "192.0.2.21,198.51.100.9", expectedClient: "192.0.2.21"},
		{name: "direct call naming none", forwardedFor: "198.51.100.9", expectedClient: ""},
		{name: "no header", expectedClient: ""},
	}

	for _, testCase := range testCases {
		t.Run(testCase.name, func(t *testing.T) {
			t.Parallel()

			header := http.Header{}
			if testCase.forwardedFor != "" {
				header.Set("X-Forwarded-For", testCase.forwardedFor)
			}

			client, _ := forwarded_headers.ClientAddress(
				header,
				config.TrustForwardedFor,
				config.TrustClientHeaders,
				config.ForwardedForHops,
				config.TrustedProxies,
			)
			if client != testCase.expectedClient {
				t.Errorf("%s: got %q, want %q", testCase.name, client, testCase.expectedClient)
			}
		})
	}
}
