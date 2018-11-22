/*
  Generate swc-definition.json
  "SWC-101": {
    "markdown": "",
    "content": {
      "Title": "",
      "Relationships": "",
      "Description": "",
      "Remediation": ""
    }
  },
*/
const fs = require('fs');
const path = require('path');
const md2json = require('md-2-json');

const walkSync = (dir) => {
  let filelist = [];
  fs.readdirSync(dir).forEach((file) => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};


const generateSWC = () => {
  const files = walkSync('../entries');
  const result = {};

  files.map(file => {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = md2json.parse(content);
    const [name] = /(SWC)-[0-9]+/.exec(file);
    const root = parsed.Title;
    try {
      result[name] = {
        markdown: content,
        content: {
          Title: root.raw.trim(),
          Relationships: root.Relationships.raw.trim(),
          Description: root.Description.raw.trim(),
          Remediation: root.Remediation.raw.trim(),
        },
      };
    } catch(e) {
      console.log(`[ERROR] Wrong document format: ${name}.md`)
      console.log(e)
      process.exit(1);
    }
    
    if (Object.values(result[name]).indexOf("") > -1) {
      console.log(`Error: ${name}`)
      process.exit(1);
    }
  })
  return result;
}

console.log(JSON.stringify(generateSWC(), null, 2));
// Return 0 status code
process.exit();