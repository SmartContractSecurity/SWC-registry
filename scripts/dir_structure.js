const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist)
        } else {
            filelist = filelist.concat(path.join(dir, file));
        }
    });
    return filelist;
};

let hasError = false;

const files = walkSync('../test_cases');

files.map(file => {
    if (file.endsWith(".yaml")) {
        const splitedPath = file.split('/');

        const [ filepath, folder ] = splitedPath.reverse();
        const [ filename ] = filepath.split('.');

        if (folder !== filename) {
            hasError = true;
            console.log(`Path is wrong: ${file}`);
        }

        if (!fs.existsSync(file.replace(".yaml", ".sol"))) {
            hasError = true;
            console.log(`Sol file is missing for: ${file}`);
        }

        if (!fs.existsSync(file.replace(".yaml", ".json"))) {
            hasError = true;
            console.log(`JSON file is missing for: ${file}`);
        }
    }
});


if (hasError) {
    process.exit(1);
} else {
    process.exit(0);
}