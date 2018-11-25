/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

class Download extends React.Component {
  render() {
    let language = this.props.language || '';
    const supportLinks = [
      {
        content: `Learn more using the [documentation on this site.](${docUrl(
          'doc1.html',
          language
        )})`,
        title: 'Browse Docs',
      },
      {
        content: 'Ask questions about the documentation and project',
        title: 'Join the community',
      },
      {
        content: "Find out what's new with this project",
        title: 'Stay up to date',
      },
    ];

    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <article className="post">
            <header className="postHeader">
              <h2>Downloads</h2>
            </header>
            <p>
              Vorple version 3.1.0 packages can be downloaded from the links below:
            </p>

            <ul>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform6-3.1.0.zip"}>
                  Inform 6 libraries
                </a>
              </li>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform7-3.1.0.zip"}>
                  Inform 7 extensions and template
                </a>
              </li>
            </ul>
            
            <p>
              Additionally the resource files used in some of the examples can be downloaded
              {" "}<a href={siteConfig.baseUrl + "resources.zip"}>here</a>.
            </p>
          </article>
        </Container>
      </div>
    );
  }
}

module.exports = Download;
