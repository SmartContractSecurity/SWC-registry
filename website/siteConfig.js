/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
var hljsDefineSolidity = require('highlightjs-solidity');
// var hljs = require('highlightjs');
// hljsDefineSolidity(hljs);

const siteConfig = {
  title: 'Overview',
  tagline: 'Smart Contract Weakness Classification and Test Cases',
  url: 'https://SmartContractSecurity.github.io',
  baseUrl: '/SWC-registry/',
  projectName: 'SWC-registry',
  organizationName: 'SmartContractSecurity',
  customDocsPath: 'website/docs',
  headerLinks: [
    {doc: 'SWC-100', label: 'Registry'},
  ],
  headerIcon: 'img/docusaurus.svg',
  footerIcon: 'img/docusaurus.svg',
  favicon: 'img/favicon.png',
  colors: {
    primaryColor: '#4d504e',
    secondaryColor: '#205C3B',
  },
  headerIcon: '',
  copyright: `Copyright © ${new Date().getFullYear()} SmartContractSecurity`,
  highlight: {
    theme: 'default',
    defaultLang: 'javascript',
    hljs: function(hljs) {
      return hljsDefineSolidity(hljs);
      // hljs.initHighlightingOnLoad();
    }
  },
  // algolia: {
  //   apiKey: '25626fae796133dc1e734c6bcaaeac3c',
  //   indexName: 'docsearch',
  // },
  scripts: [],
  footerscripts: [
    'https://rawgit.com/s0b0lev/SWC-registry/website/website/scripts/lineNumbers.js',
  ],
  onPageNav: 'separate',
  cleanUrl: true,
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',
  repoUrl: 'https://github.com/SmartContractSecurity/SWC-registry',
};

module.exports = siteConfig;