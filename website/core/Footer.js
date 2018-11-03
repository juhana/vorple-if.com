/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require( 'react' );

class Footer extends React.Component {
    docUrl( doc, language ) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
    }

    pageUrl( doc, language ) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? language + '/' : '') + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="copyright">
                    <div className="licenselogo">
                        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                            <img alt="Creative Commons License" src="https://i.creativecommons.org/l/by/4.0/88x31.png"/>
                        </a>
                    </div>
                    <div className="licensetext">
                        <div>
                            {this.props.config.copyright}
                        </div>

                        <div>
                            Content licensed under a
                        </div>
                        <div>
                            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>
                        </div>
                    </div>
                    <div className="github-footer">
                        <a href="https://github.com/vorple">
                            <img src={this.props.config.baseUrl + "img/github.png"} alt="GitHub" />
                            <br />
                            GitHub
                        </a>
                    </div>
                </section>
            </footer>
        );
    }
}

module.exports = Footer;
