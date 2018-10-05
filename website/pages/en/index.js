/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const fs = require('fs');
const path = require('path');
const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const md2json = require('md-2-json');
const showdown = require('showdown');
const yaml = require('js-yaml');

const converter = new showdown.Converter();

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {

    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));

  });
return filelist;
}

const getBaseClassHTML = (item) => {
  let data = '';
  try {
    data = item['Relationships'].raw.trim()
  } catch (err) {}
  return converter.makeHtml(data);
}

const genrateTestCases = () => {
  const result = {};
  const files = walkSync('../test_cases');
  for (let i = 0; i < files.length; i += 1) {
    const file = files[i];
    if (file.endsWith('.yaml')) {
      const content = fs.readFileSync(file, 'utf8');

      try {
        const doc = yaml.safeLoad(content);
        for (let index = 0; index < doc.issues.length; index += 1) {
          const issue = doc.issues[index];
          if (!result[`${issue.id}`]) {
            result[`${issue.id}`] = [];
          }
          const testCasePath = file.split('../')[1];
          const splitedPath = testCasePath.split('/')
          const name = splitedPath[splitedPath.length - 1]
          result[`${issue.id}`].push(name.replace('.yaml', '.sol'));
        }
      } catch (e) {
      }
    }
  }
  return result;
}

const generateTable = () => {
  const result = [];
  const testCases = genrateTestCases();
  fs.readdirSync('docs').forEach((file) => {
    if (file !== '.gitkeep') {
      const content = fs.readFileSync(`docs/${file}`, 'utf8');
      const parsed = md2json.parse(content);
      const { Title } = parsed;
      const name = file.split('.md')[0];
      result.unshift({ 
        name,
        title: converter.makeHtml(Title.raw && Title.raw.trim()),
        baseClass: getBaseClassHTML(Title),
        issues: testCases[name]
      });
    }
  });
  return result;      
}

const imgUrl = (img) => `${siteConfig.baseUrl}img/${img}`;

const docUrl = (doc) => `${siteConfig.baseUrl}docs/${doc}`;

const docSectionUrl = (doc, section) => {
  let sectionPath = section.toLowerCase();
  sectionPath = sectionPath.split('_').join('-');
  sectionPath = sectionPath.split('.').join('');
  return `${siteConfig.baseUrl}docs/${doc}#${sectionPath}`;
}


const Button = props => {
  return (
    <div className="pluginWrapper buttonWrapper">
      <a className="button" href={props.href} target={props.target}>
        {props.children}
      </a>
    </div>
  );
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo"></div>
);

const ProjectTitle = () => (
  <h2 className="projectTitle">
    SWC Registry
    <small>{siteConfig.tagline}</small>
  </h2>
);


class HomeSplash extends React.Component {
  render() {
    const language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle />
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom']}
    id={props.id}
    background={props.background}>
    <GridBlock contents={props.children} layout={props.layout} />
  </Container>
);


function createMarkup(html) {
  return {__html: html};
}

const RenderSWC = () => {
  const data = generateTable();
  const renderFiles = data.map(item => {
    return (
      <tr key={item.name}>
        <td width="100">
          <a href={docUrl(item.name)}>
            {`${item.name}`}
          </a>
        </td>
        <td dangerouslySetInnerHTML={createMarkup(item.title)}></td>
        <td dangerouslySetInnerHTML={createMarkup(item.baseClass)}></td>
        <td>
          <ul>
            {item.issues && item.issues.map((issue, index) => 
              <li key={index}><a href={docSectionUrl(item.name, issue)}>{issue}</a></li>
            )}
          </ul>
        </td>
      </tr>
    )
  })
  return (
    <table style={{ width: '100%', display: 'inline-table' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Relationships</th>
          <th>Test cases</th>
        </tr>
      </thead>
      <tbody>
        {renderFiles}
      </tbody>
    </table>
  );
}

class Index extends React.Component {
  render() {
    return (
      <Container>
        <HomeSplash language='' />
        <div className="mainContainer">
          <p>The following table contains an overview of the SWC registry. 
            Each row consists of an SWC identifier (ID), weakness title, CWE parent
             and list of related code samples. The links in the "ID" and "test cases" 
             columns links to details about the respective SWC. Links in the 
             "Relationships" column lead to the CWE Base or Class type.</p>
          <RenderSWC />
        </div>
      </Container>
    );
  }
}

module.exports = Index;
