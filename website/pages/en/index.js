/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const fs = require('fs');
const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;
const siteConfig = require(`${process.cwd()}/siteConfig.js`);
const md2json = require('md-2-json');
const showdown = require('showdown');

const converter = new showdown.Converter();

const getBaseClassHTML = (item) => {
  let data = '';
  try {
    data = item['Base/Class ID'].raw.trim();
  }
  catch (err) {}
  return converter.makeHtml(data);
}

const getTitleHTML = (item) => {
  return converter.makeHtml(item.raw && item.raw.trim());
}

const generateTable = () => {
    const result = [];
    fs.readdirSync('docs').forEach((file) => {
      const content = fs.readFileSync(`docs/${file}`, 'utf8');
      const parsed = md2json.parse(content);
      const { Title } = parsed;
      const [name, ..._] = file.split('.md');
      result.unshift({ 
        name,
        title: getTitleHTML(Title),
        baseClass: getBaseClassHTML(Title),
      });
    });
    return result;      
}

const imgUrl = (img) => `${siteConfig.baseUrl}img/${img}`;

const docUrl = (doc, language) => `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;

const pageUrl = (page, language) => siteConfig.baseUrl + (language ? `${language}/` : '') + page;

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
    {siteConfig.title}
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


const Description = () => {
  const content = fs.readFileSync('meta/README.md', 'utf8');
  return (
    <Container>
      <MarkdownBlock>
        {content}
      </MarkdownBlock>
    </Container>
  )
};

function createMarkup(html) {
  return {__html: html};
}

const RenderSWC = () => {
  const data = generateTable();
  const renderFiles = data.map(item => {
    return (
      <tr key={item.name}>
        <td width="100">
          <a href={docUrl(item.name, '')}>
            {`${item.name}`}
          </a>
        </td>
        <td dangerouslySetInnerHTML={createMarkup(item.title)}></td>
        <td dangerouslySetInnerHTML={createMarkup(item.baseClass)}></td>
        <td></td>
      </tr>
    )
  })
  return (
    <Container>
      <table style={{ width: '100%', display: 'inline-table' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Base/Class</th>
            <th>Test cases</th>
          </tr>
        </thead>
        <tbody>
          {renderFiles}
        </tbody>
      </table>
    </Container>
  );
}

class Index extends React.Component {
  render() {
    return (
      <Container>
        <HomeSplash language='' />
        <div className="mainContainer">
          <RenderSWC />
          <Description />
        </div>
      </Container>
    );
  }
}

module.exports = Index;
