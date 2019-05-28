const commandExistsSync = require('command-exists').sync;
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;
const web3Utils = require('web3-utils');
const command = process.argv[2];


const checkMyth = () => {
  if(commandExistsSync('myth')) {
    console.log('myth installed');
  } else {
    console.log('You should have myth installed to using this tool.');
    process.exit(1);
  }
}

const printFinalOutput = (fileName, bin, binSha3, binDisasm, binRuntime, binRuntimeSha3, binRuntimeDisasm) => {
  console.log('\nContract:' + fileName);
  console.log('Creation Bytecode:' + bin);
  console.log('Keccak256 Hash:' + binSha3);
  console.log(binDisasm);
  console.log('\nRuntime Bytecode:' + binRuntime);
  console.log('Keccak256 Hash:' + binRuntimeSha3);
  console.log(binRuntimeDisasm);
}

const getSha3 = (bytecode) => {
  return web3Utils.sha3('0x' + bytecode);
}

const getDisasm = (bytecode) => {
  var spawn = spawnSync('myth',['-d', '-c', bytecode]);
  var errorText = spawn.stderr.toString().trim();

	if (errorText) {
	  console.log('Fatal error from `myth -d -c [bytecode]`.');
    console.log(errorText);
    process.exit(1);
	}
	else {
	  return spawn.stdout.toString().trim();
	}
}

const checkByteCode = () => {
  if(!command) {
    console.log('You should enter a path to a compile artifact.')
    process.exit(1);
  }
  let artefact = JSON.parse(fs.readFileSync(command, 'utf8'));
  let numberBytecodesPair = Object.keys(artefact.contracts);
  if(numberBytecodesPair.length == 0) {
    console.log('There are no bin and bin-runtime into compile artifact.');
    process.exit(1);
  }
  for(let i=0;i<numberBytecodesPair.length;i++) {
    let fileName = Object.keys(artefact.contracts)[i];
    if(fileName) {
      let bin = artefact.contracts[fileName].bin;
      let binRuntime = artefact.contracts[fileName]['bin-runtime'];
      if(bin && binRuntime) {
        let binSha3 = getSha3(bin);
        let binRuntimeSha3 = getSha3(binRuntime);
        if(!binSha3 || !binRuntimeSha3) {
          console.log('You should check the correctness of bin/bin-runtime into compile artifact.');
          process.exit(1);
        }
        let binDisasm = getDisasm(bin);
        let binRuntimeDisasm = getDisasm(binRuntime);
        printFinalOutput(fileName, bin, binSha3, binDisasm, binRuntime, binRuntimeSha3, binRuntimeDisasm);
      }
      else {
        console.log('\nbin and bin-runtime missing in ' + fileName);
      }
    }
    else {
      console.log('You should insert a valid compile artefact.');
      process.exit(1);
    }
  }
}

const generateOutput = () => {
  checkMyth();
  checkByteCode();
}
generateOutput();
