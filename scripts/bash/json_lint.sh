find ../test_cases -name '*.json' -print | while read line; do
    command=$(./node_modules/jsonlint/lib/cli.js $line > /dev/null)
    if (($? > 0)); then
        echo "ERROR: Wrong json object - $line"
        exit 1
    fi
done
