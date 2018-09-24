const fs = require('fs');

const DOCS_LOCATION = './docs';

const files = fs.readdirSync(DOCS_LOCATION);

const sidebar = {
  "docs": {
    "SWC ID": files.map(file => file.split('.md')[0]),
  }
}

console.log(JSON.stringify(sidebar));
