const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const web3 = require('web3');
const chalk = require('chalk');


const walkSync = (dir, filelist=[]) => {
    fs.readdirSync(dir).forEach((file) => {
        if(fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist =  walkSync(path.join(dir, file), filelist)
        } else {
            if (file.includes('.yaml')) {
                filelist = filelist.concat(path.join(dir, file));
            }
        }
    });
    return filelist;
};

const KECCAK256_HASH_LENGTH = 64;
const HASH_PREFIX_LENGTH = "0x".length;

const ERRORS = {};

const CHECKER_ERRORS = {
    DESCRIPTION: {
        code: '100',
        success: 'Description is ok'
    },
    SWC_ID_FORMAT: {
        code: '101',
        success: 'Valid SWC-ID format'
    },
    ISSUE_COUNT: {
        code: '102',
        success: 'Issue count value is correct',
    },
    HASH_GENERATION: {
        code: '103',
        success: 'Hashes was successfuly generated'
    },
    HASH_LENGTH: {
        code: '104',
        success: 'Valid hash length'
    },
    HASH_PREFIX: {
        code: '105',
        success: 'Hash prefix 0x exists'
    },
    HASH_COMPARE: {
        code: '106',
        success: 'Hash was generated regarding creation (or runtime) bytecode in any of contracts at test case json'
    },
    LINO_POINTER: {
        code: '107',
        success: 'Issue location points to nonexistent file'
    }
}


const logError = (config, code, error) => {
    if (Object.keys(ERRORS).indexOf(config) < 0) ERRORS[config] = {};
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
        const displayCreation = creation.join('\n-')
        const displayRuntime = runtime.join('\n-')
        logError(config, 106, `Wrong hash! Possible variants:\n ${displayCreation} \n ${displayRuntime}`);
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

const displayErrors = () => {
    console.log(chalk.white.bgRed('ERRORS:'))
    const configs = Object.keys(ERRORS);
    configs.map(config => {
        console.log('*----------------------------------------------*')
        console.log(chalk.red.bold(`Config: ${config}`));

        const errors = Object.keys(ERRORS[config]);
        const checkers = Object.keys(CHECKER_ERRORS);

        checkers.map(key => {
            const check = CHECKER_ERRORS[key];
            const { code, success } = check;
            let displayCheck = chalk.green(` -- ${success}`);
            if (errors.includes(code)) {
                const error = ERRORS[config][code];
                displayCheck = chalk.red(` -- ${error}`);
            }
            console.log(displayCheck)
        })
        console.log('*----------------------------------------------*')
    })
};
if (Object.keys(ERRORS).length > 0) {
    displayErrors();
    process.exit(1);
} else {
    console.log(chalk.green.bold('Success! \nYaml configs were validated. All configs passed required checks.'));
    process.exit();
}