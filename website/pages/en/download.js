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
            <p>
              Vorple version 3.2.3 packages (released September 3rd, 2020) can be downloaded from the links below:
            </p>

            <ul>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform6-3.2.3.zip"}>
                  Inform 6 libraries
                </a>
              </li>
              <li>
                <a href={siteConfig.baseUrl + "releases/vorple-inform7-3.2.3.zip"}>
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
