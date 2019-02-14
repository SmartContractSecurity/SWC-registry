const { execSync } = require("child_process");

const files = execSync("find ../test_cases -name '*.yaml'");

const stdout = files.toString().split('\n');

let hasError = false;

stdout.map(file => {
    if (file) {
        try {
            const output = execSync(`./node_modules/pajv/index.js -s swc-config-schema.json -d ${file}`);
            console.log(output.toString());
        } catch(err) {
            hasError = true;
        }
    }
})

if (hasError) {
    process.exit(1);
} else {
    process.exit(0);
}
