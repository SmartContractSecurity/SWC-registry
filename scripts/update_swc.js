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


const command = process.argv[2];


const generateSWC = () => {
  const files = walkSync('../entries');
  const result = {};

  files.map(file => {
    const content = fs.readFileSync(file, 'utf8');
    const parsed = md2json.parse(content);
    const [name] = /(SWC)-(CTK-)?[0-9]+/.exec(file);
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
      console.log(`[ERROR] Wrong document format: ${name}.md, provide content for all required headings`)
      console.log(e)
      if (command && command === 'markdown-validate') {
        process.exit(1);
      }
    }
  })
  return result;
}

const swc = generateSWC();

if (!command || command !== 'markdown-validate') {
  console.log(JSON.stringify(swc, null, 2));
}
// Return 0 status code
process.exit();
