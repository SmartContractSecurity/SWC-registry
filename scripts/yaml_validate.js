const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const web3 = require('web3');

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

const KECCAK256_HASH_LENGTH = 64;
const HASH_PREFIX_LENGTH = "0x".length;
 
let HAS_ISSUE = false;


const logError = (config, content, message) => {
    console.log('================')
    console.log(`ERROR: ${config}\n${message}`)
    console.log(content);
}


const GITHUB_CHECKERS = {
    description: (jsonContent) => jsonContent.description.length > 0,
    issues: {
        swcID: (id) => /^(SWC-)\d{3}$/.test(id),
        count: (issue) => issue.count === issue.locations.length,
        hash: {
            length: (hash) => hash.length === KECCAK256_HASH_LENGTH + HASH_PREFIX_LENGTH,
            prefix: (hash) => hash.slice(0, 2) === '0x',
            generate: (input) => keccak256(`0x${input}`),
        }
    }
}


const configValidator = (config) => {
    const configContent = fs.readFileSync(config, 'utf8');
    const configContentJson = yaml.safeLoad(configContent);

    if (!GITHUB_CHECKERS.description(configContentJson)) {
        HAS_ISSUE = true;
        logError(config, configContent, 'Missing description!');
    }
    configContentJson.issues.map(issue => issueValidator(config, configContent, issue));
}

const issueValidator = (config, content, issue) => {
    if (!GITHUB_CHECKERS.issues.swcID(issue.id)) {
        HAS_ISSUE = true;
        logError(config, content, 'Wrong SWC-ID format!');
    }
    if (!GITHUB_CHECKERS.issues.count(issue)) {
        HAS_ISSUE = true;
        logError(config, content, 'Wrong issue count and locations length!');
    }
    issue.locations.map(location => locationValidator(config, content, location));
}

const hashValidator = (config, content, hash) => {
    const { issues } = GITHUB_CHECKERS;

    if(!issues.hash.length(hash)) {
        HAS_ISSUE = true;
        logError(config, content, 'Wrong hash length!');
    }

    if(!issues.hash.prefix(hash)) {
        HAS_ISSUE = true;
        logError(config, content, 'Missing hash prefix!');
    }

    const jsonContentRaw = fs.readFileSync(config.replace('.yaml', '.json'), 'utf8')
    const { contracts } = JSON.parse(jsonContentRaw);

    const contractKey = Object.keys(contracts).filter(contract =>
        contracts[contract] && contracts[contract].bin.length > 0
    );
    const [contact, ...rest] = contractKey;
    const contract = contracts[contact];
    try {
        const bin = contract['bin-runtime'];
        const generatedHash = web3.utils.keccak256(web3.utils.toHex(`0x${bin}`));
        if(hash !== generatedHash) {
            HAS_ISSUE = true;
            logError(config, content, `Wrong hash!\nExpected != Actual\n${generatedHash} != ${hash}`);
        }
    } catch(err) {
        HAS_ISSUE = true;
        logError(config, content, `Issue in JSON config, couldnt load bytecode`);
    }
};

const linenoValidator = (lineno) => {

}

const locationValidator = (config, content, location) => {
    const { bytecode_offset, line_numbers} = location;
    const hashes = Object.keys(bytecode_offset);
    const linenums = Object.keys(line_numbers);

    hashes.map(hash => hashValidator(config, content, hash));
    linenums.map(lineno => linenoValidator(lineno));
}


const validateYamlConfig = () => {
    const configs = walkSync('../test_cases');
    configs.map(config => configValidator(config));
}

validateYamlConfig();

if (HAS_ISSUE) {
    process.exit(1);
} else  {
    process.exit();
}