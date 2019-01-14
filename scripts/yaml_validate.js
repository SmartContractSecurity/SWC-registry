const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let files = [];

const walkSync = (dir) => {
    let filelist = [];
    fs.readdirSync(dir).forEach((file) => {
        if(fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist =  walkSync(path.join(dir, file), filelist)
        } else {
            if (file.includes('.yaml')) {
                filelist = filelist.concat(path.join(dir, file));
            }
        }
    });
    files = [...files, ...filelist];
    return files;
};

let hasIssue = false;

const validateYamlConfig = () => {
    const configs = walkSync('../test_cases');
    configs.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const jsonContent = yaml.safeLoad(content);

        if (jsonContent.description.length === 0) {
            // Issue count description
            hasIssue = true;
            console.log('================')
            console.log(`ERROR: ${file} . Missing description.`)
            console.log(content);
        }

        // TODO: test SWC-[\d+] pattern

        jsonContent.issues.map((issue) => {
            // issue count is a valid integer
            if (issue.count > 0) {
                if (issue.count !== issue.locations.length) {
                    // the sum of location pairs have to match count: except when count is zero.
                    hasIssue = true;
                    console.log('================')
                    console.log(`Error in ${file}\n`)
                    console.log('Wrong issue count and locations length:\n');
                    console.log(content);
                }
            } else {
                // In case if 0
                if (issue.locations) {
                    // Or 1 location paris
                    if (issue.locations.length == 1) {
                        // with no location settings
                        issue.locations.map(location => {
                            if (location.bytecode_offsets && location.bytecode_offsets.length > 0 ||
                                location.line_numbers && location.line_numbers.length > 0) {
                                hasIssue = true;
                                console.log('================')
                                console.log(`Error in ${file}\n`)
                                console.log('Wrong issue count and locations:\n');
                                console.log(content);
                            }
                        })
                    } else {
                        hasIssue = true;
                        console.log('================')
                        console.log(`Error in ${file}\n`)
                        console.log('Wrong issue count and locations:\n');
                        console.log(content);
                    }
                }
            }

        })
    });
}

validateYamlConfig();

if (hasIssue) {
    process.exit(1);
} else  {
    process.exit();
}