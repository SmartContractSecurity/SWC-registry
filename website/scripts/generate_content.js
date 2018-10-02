const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}


const generateContractSamples = () => {
  const result = {};
  const files = walkSync('../test_cases');
  for (let i = 0; i < files.length; i += 1) {
    let file = files[i];
    if (file.endsWith('.yaml')) {
      const content = fs.readFileSync(file, 'utf8');
      try {
        const doc = yaml.safeLoad(content);
        for (let index = 0; index < doc.issues.length; index += 1) {
          const issue = doc.issues[index];
          if (!result[`${issue.id}`]) {
            result[`${issue.id}`] = [];
          }
          result[`${issue.id}`].push(file);
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return result;
}

const writeFile = (filename, content) => {
  fs.writeFile(filename, content, (err) => {  
    if (err) throw err;
  });
}

const populateDocumentation = () => {
  const smartContractSamples = generateContractSamples();
  const files = walkSync('../entries');
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    const swcContent = fs.readFileSync(file, 'utf8');
    const nameParsed = /(SWC)-[0-9]+/.exec(file);
    let name;
    let samplesTemplate;
    let template = swcContent;
    if (nameParsed !== null) {
      name =  nameParsed[0];
      const samples = smartContractSamples[name];
      if (samples !== undefined) {
        samplesTemplate = '\n## Contract Samples';
        for (let index = 0; index < samples.length; index += 1) {

          const configPath = samples[index];
          const solidityPath = samples[index].replace('.yaml', '.sol');

          const samplesContent = fs.readFileSync(solidityPath, 'utf8');
          const configContent = fs.readFileSync(configPath, 'utf8');

          let solidityPathSplited = solidityPath.split('/');
          smartContractName = solidityPathSplited[solidityPathSplited.length - 1]
          samplesTemplate += '\n### ' + smartContractName
          samplesTemplate += '\n```Solidity\n' + samplesContent + '\n```\n'
          samplesTemplate += '\n#### Config\n'
          samplesTemplate += '\n```yaml\n' + configContent + '\n```\n'
        }
        
      }
      template += samplesTemplate;
    }
    if (name) {
      writeFile(`docs/${name}.md`, template)
    }
  }
}

populateDocumentation();