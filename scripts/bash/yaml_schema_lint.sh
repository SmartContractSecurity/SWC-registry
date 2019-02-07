find ../test_cases -name '*.yaml' -print | while read line; do
    command=$(./node_modules/pajv/index.js -s swc-config-schema.json -d $line)
    if [[ $command = *".yaml valid"* ]]; then
        echo "PASSED: $line"
        
    else
        echo "$command" >&2
        echo ""
        export VALIDATION_ERROR=1
    fi
done

if [ -z "$VALIDATION_ERROR" ]
then
    exit 1
fi