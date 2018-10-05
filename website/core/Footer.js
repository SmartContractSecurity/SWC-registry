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
            <a href="https://github.com/SmartContractSecurity/SWC-registry/#creating-a-new-swc-entry">How to add a new SWC entry</a>
            <a href="https://github.com/SmartContractSecurity/SWC-registry/#creating-a-new-test-case">How to add a new Test Case</a>
          </div>
          <div>
            <h5>Community</h5>
            <a href="https://discord.gg/qcNvR2r">Join the Discord channel #swc-registry</a>
            <a href="https://github.com/ethereum/EIPs/issues/1469">EIP-1470 discussion at ethereum/EIPs</a>
          </div>
          <div>
            <h5>More</h5>
            <a href="https://github.com/SmartContractSecurity/SWC-registry/">Back to SWC-registry repo</a>
          </div>
        </section>
        <section className="copyright">{this.props.config.copyright}</section>
        {this.props.config.footerscripts &&
          this.props.config.footerscripts.map(function(source, idx) {
            return (
              <script
                type="text/javascript"
                key={'script' + idx}
                src={source}
              />
            );
          })}
      </footer>
    );
  }
}

module.exports = Footer;
