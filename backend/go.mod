module github.com/altshiftab/altshift_www

go 1.26

require github.com/altshiftab/utils_go v1.22.0

tool (
	github.com/altshiftab/utils_go/cmd/generate_endpoints
	github.com/altshiftab/utils_go/cmd/translate_json_object
)
