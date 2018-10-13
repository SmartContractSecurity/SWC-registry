find ../test_cases -name '*.yaml' -print | while read line; do
    command=$(node_modules/yaml-schema-validator/index.js validate -s swc-config-schema.yaml -f $line)
    echo "$command"
    if [[ $command = *"ERROR : ====== Schema Validation Error ======"* ]]; then
        echo "$command" >&2
        exit 1
    fi
done
