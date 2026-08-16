module github.com/altshiftab/altshift_www

go 1.26

require github.com/Motmedel/utils_go v1.17.1

tool (
	github.com/Motmedel/utils_go/cmd/generate_endpoints
	github.com/Motmedel/utils_go/cmd/translate_json_object
)
