/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <div>
            <h5>Docs</h5>
            <a href="https://smartcontractsecurity.github.io/SWC-registry/#create-a-new-swc-entry">How to add a SWC definition</a>
            <a href="https://smartcontractsecurity.github.io/SWC-registry/#create-a-test-case">How to add a test case</a>
            <a href="">EIP XXXX</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://discord.gg/qcNvR2r">Join the Discord channel #swc-registry</a>
            <a href="">Discussion at the Ethereum Magicians</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/SmartContractSecurity/SWC-registry/">Back to SWC-registry repo</a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
      </footer>
    );
  }
}

module.exports = Footer;
