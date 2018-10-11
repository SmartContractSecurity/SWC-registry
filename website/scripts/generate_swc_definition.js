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

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
}

const files = walkSync('../entries');

const result = {};

for (let i = 0; i < files.length; i += 1) {
  const file = files[i];
  const content = fs.readFileSync(file, 'utf8');
  const parsed = md2json.parse(content);
  const [SWCName, ...rest] = /(SWC)-[0-9]+/.exec(file);
  const root = parsed.Title;
  result[SWCName] = {
    markdown: content,
    content: {
      Title: root.raw.trim(),
      Relationships: root.Relationships.raw.trim(),
      Description: root.Description.raw.trim(),
      Remediation: root.Remediation.raw.trim(),
    }
  };
}

console.log(JSON.stringify(result, null, 2));
