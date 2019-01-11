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
    const result = {};
    configs.map(file => {
        const content = fs.readFileSync(file, 'utf8');
        const jsonContent = yaml.safeLoad(content);
        jsonContent.issues.map((issue) => {
            if(issue.locations) {
                if (issue.count !== issue.locations.length){
                    hasIssue = true;
                    console.log('================')
                    console.log(`Error in ${file}\n`)
                    console.log('Wrong yaml config count value:\n');
                    console.log(content);
                }
            }
        })
    });
    return result;
}

console.log(validateYamlConfig());

if (hasIssue) {
    process.exit(1);
} else  {
    process.exit();
}