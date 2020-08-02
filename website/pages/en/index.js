/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require( 'react' );

const CompLibrary = require( '../../core/CompLibrary.js' );
const MarkdownBlock = CompLibrary.MarkdownBlock;
/* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require( process.cwd() + '/siteConfig.js' );

function imgUrl( img ) {
    return siteConfig.baseUrl + 'img/' + img;
}

function docUrl( doc, language ) {
    return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl( page, language ) {
    return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href}
                   target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
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

const ProjectTitle = props => (
    <h2 className="projectTitle">
        <img src={imgUrl( 'vorple-gray-300x177.png' )} />
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        let language = this.props.language || '';
        return (
            <SplashContainer>
                <div className="inner">
                    <ProjectTitle/>
                    <PromoSection>
                        <Button href="#demo">
                            See the demo
                        </Button>
                        <Button href={docUrl( 'about.html', language )}>
                            Get started
                        </Button>
                        <Button href={siteConfig.baseUrl + 'download.html'}>
                            Download
                        </Button>
                        <Button href="https://borogove.app">
                            <strong>
                                Try online
                            </strong>
                        </Button>
                    </PromoSection>
                </div>
            </SplashContainer>
        );
    }
}

const Block = props => (
    <Container
        padding={[ 'bottom', 'top' ]}
        id={props.id}
        background={props.background}>
        <GridBlock align="center" contents={props.children}
                   layout={props.layout}/>
    </Container>
);

const Features = props => (
    <Block layout="fourColumn">
        {[
            {
                content: 'Extend Inform games in ways that are not possible in standard interpreters. Add features like music, pictures, different fonts, popups, tooltips and much more.',
                // image: imgUrl( 'docusaurus.svg' ),
                imageAlign: 'top',
                title: 'Go beyond the interpreter',
            },
            {
                content: 'Take advantage of everything that modern web platforms can offer. Style your game with CSS and run JavaScript commands directly from Inform.',
                imageAlign: 'top',
                title: 'Full control of game appearance and behavior',
            },
            {
                content: 'Write Vorple games online with Borogove, the online IF development environment.',
                imageAlign: 'top',
                title: 'Try it online',
            }
        ]}
    </Block>
);

const FeatureCallout = props => (
    <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>
            Ready-to-use Inform extensions and libraries
        </h2>

        <p>
            No web developer skills needed — basic functionality is provided in
            included extensions and libraries. Add new features to your game
            by writing Inform code.
        </p>

        <p>
            For custom features Vorple lets you include and run JavaScript code
            directly from Inform to interact with the browser it's running on.
            You can now create anything with Inform that you could create with
            JavaScript-based apps.
        </p>
    </div>
);

const Demo = props => (
    <div className="darkBackground video-container">
        <a className="anchor" aria-hidden="true" id="demo" />
        <a href="https://www.youtube.com/embed/Haol9P1Vi-8?autoplay=1" target="_blank" className="youtube-link video-player">
            <div className="youtube-link-overlay" />
            <iframe width="896" height="504"
                    src="https://www.youtube.com/embed/Haol9P1Vi-8?autoplay=1&loop=1&mute=1&controls=0&playlist=Haol9P1Vi-8" frameBorder="0"
                    allow="autoplay; encrypted-media" allowFullScreen />
        </a>

        <div className="video-description">
            <p>
                <strong>
                    Check out this demo by Hugo Labrande showcasing some features that Vorple offers.
                </strong>

                <ul>
                    <li>
                        Watch the video <a href="https://www.youtube.com/watch?v=Haol9P1Vi-8">in English</a> or <a href="https://www.youtube.com/watch?v=3eD0d7DNGVY">in French</a>
                    </li>
                    <li>
                        <a href="https://hlabrande.itch.io/neon-vertex">Try the demo online</a>
                    </li>
                    <li>
                        <a href="https://bitbucket.org/hlabrand/neon-vertex/src/master">Inform 6 source code</a>
                    </li>
                </ul>
            </p>
        </div>
    </div>
);

const Showcase = props => {
    if( (siteConfig.users || []).length === 0 ) {
        return null;
    }
    const showcase = siteConfig.users
        .filter( user => {
            return user.pinned;
        } )
        .map( ( user, i ) => {
            return (
                <a href={user.infoLink} key={i}>
                    <img src={user.image} alt={user.caption}
                         title={user.caption}/>
                </a>
            );
        } );

    return (
        <div className="productShowcaseSection paddingBottom">
            <h2>Play Vorple games</h2>
            <div className="logos">{showcase}</div>
            <div className="more-users">
                <a className="button"
                   href="http://ifdb.tads.org/search?sortby=new&newSortBy.x=0&newSortBy.y=0&searchfor=vorple">
                    More games
                </a>
            </div>
        </div>
    );
};

class Index extends React.Component {
    render() {
        let language = this.props.language || '';

        return (
            <div>
                <HomeSplash language={language} />
                <div className="mainContainer">
                    <Features />
                    <FeatureCallout />
                    <Demo />
                    <Showcase language={language} />
                </div>
            </div>
        );
    }
}

module.exports = Index;
