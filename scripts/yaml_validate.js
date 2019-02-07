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

const ERRORS = {};


const logError = (config, code, error) => {
    if (!config) {
        console.log(code)
        console.log(error);
        console.log('testsasfasfasdf')
    }
    if (Object.keys(ERRORS).indexOf(config) < 0) {
        ERRORS[config] = {};
    }
    ERRORS[config][code] = error
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
        logError(config, 100, 'Missing description!');
    }
    configContentJson.issues.map(issue => issueValidator(config, configContent, issue));
}

const issueValidator = (config, content, issue) => {
    if (!GITHUB_CHECKERS.issues.swcID(issue.id)) {
        logError(config, 101, 'Wrong SWC-ID format!');
    }
    if (!GITHUB_CHECKERS.issues.count(issue)) {
        logError(config, 102, 'Wrong issue count and locations length!');
    }
    issue.locations.map(location => locationValidator(config, content, location));
}

const generateHash = (hash, config) => {
    try {
        const contractHex = web3.utils.toHex('0x' + hash)
        return web3.utils.keccak256(contractHex);
    } catch(err) {
        logError(config, 103, err);
        return "ERROR";
    }
}

const hashValidator = (config, hash) => {
    const { issues } = GITHUB_CHECKERS;

    if(!issues.hash.length(hash)) {
        logError(config, 104, 'Wrong hash length!');
    }

    if(!issues.hash.prefix(hash)) {
        logError(config, 105, 'Missing hash prefix!');
    }

    const jsonContentRaw = fs.readFileSync(config.replace('.yaml', '.json'), 'utf8')
    const { contracts } = JSON.parse(jsonContentRaw);

    contractKeys = Object.keys(contracts).filter(contract =>
        contracts[contract] && contracts[contract].bin.length > 0
    );
    const creation = contractKeys.map(contract => generateHash(contracts[contract]['bin'], config));
    const runtime = contractKeys.map(contract => generateHash(contracts[contract]['bin-runtime'], config));
    if(!creation.includes(hash) && !runtime.includes(hash)) {
        logError(config, 106, `Wrong hash! ${hash}, Possible variants: ${runtime} \n ${creation}`);
    }
};

const linenoValidator = (config, content, lineno) => {
    const pathSplited = config.split('/');
    pathSplited.pop();
    pathSplited.push(lineno);
    const path = pathSplited.join('/');

    if (!fs.existsSync(path)) {
        logError(config, 107, 'Solidity file from `locations` doesn\'t exists.');
    }

}

const locationValidator = (config, content, location) => {
    const { bytecode_offsets, line_numbers} = location;
    const hashes = Object.keys(bytecode_offsets);
    const linenums = Object.keys(line_numbers);

    hashes.map(hash => hashValidator(config, hash));
    linenums.map(lineno => linenoValidator(config, content, lineno));
}


const validateYamlConfig = () => {
    const configs = walkSync('../test_cases');
    configs.map(config => configValidator(config));
}

validateYamlConfig();


if (Object.keys(ERRORS).length > 0) {
    console.log(JSON.stringify(ERRORS, null, 2))
    process.exit(1);
} else {
    console.log('Passed.')
    process.exit();
}