const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;
const siteConfig = require(process.cwd() + '/siteConfig.js');

class Download extends React.Component {
  render() {
    return (
      <div className="docMainWrapper wrapper">
        <Container className="mainContainer documentContainer postContainer">
          <article className="post">
            <header className="postHeader">
              <h2>Downloads</h2>
            </header>

            <h3>Inform 7</h3>

            <p>
              Vorple is compatible with Inform 7 version 10.1.0 (released in April 2022) and onwards starting from Vorple
              version <strong>4.0.0</strong>. Vorple version 3.2.8 is the last release compatible with Inform 7 release 6M62.
            </p>

            <ul>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform7-4.0.0.zip"}>
                  Version 4.0.0: Extensions and template for Inform 7 version 10.1.0
                </a>
              </li>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform7-3.2.8.zip"}>
                  Version 3.2.8: Extensions and template for Inform 7 release 6M62
                </a>
              </li>
            </ul>


            <h3>Inform 6</h3>

            <p>
              All Vorple versions are equally compatible with Inform 6. Using the latest version (4.0.0) is recommended
              but version 3.2.8 can be downloaded <a href={siteConfig.baseUrl + "releases/vorple-inform6-3.2.8.zip"}>here</a> if
              there's some specific reason to use it.
            </p>

            <ul>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform6-4.0.0.zip"}>
                  Version 4.0.0: Inform 6 libraries
                </a>
              </li>
            </ul>

            <h3>Additional resource files</h3>
            
            <p>
              The resource files used in some of the examples can be downloaded
              {" "}<a href={siteConfig.baseUrl + "resources.zip"}>here</a>.
            </p>
          </article>
        </Container>
      </div>
    );
  }
}

module.exports = Download;
