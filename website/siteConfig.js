const siteConfig = {
    title: 'Vorple',
    tagline: 'User Interface Library for Interactive Fiction',
    url: 'https://vorple.github.io',
    baseUrl: '/',
    projectName: 'vorple',
    organizationName: 'vorple',

    // For no header links in the top nav bar -> headerLinks: [],
    headerLinks: [
        {doc: 'about', label: "Author's Guide"},
        {page: 'api/index', label: 'JavaScript API'},
        {href: 'https://borogove.app', label: 'Try Online'},
        {page: 'download', label: 'Download'},
        {doc: 'contribute', label: 'Contribute'}
    ],

    /* path to images for header/footer */
    headerIcon: null,
    footerIcon: 'img/vorple-white-58x34.png',
    favicon: 'favicon-32x32.png',

    /* colors for website */
    colors: {
        primaryColor: '#464646',
        secondaryColor: '#661111',
    },

    // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
    copyright:
        'Copyright © ' +
        new Date().getFullYear() +
        ' Vorple contributors',

    highlight: {
        // Highlight.js theme to use for syntax highlighting in code blocks
        theme: 'default'
    },

    users: [
        {
            caption: "Corax: Hansel et Gretel - La Revanche",
            image: "img/covers/hansel-et-gretel.jpg",
            infoLink: "http://www.fiction-interactive.fr/fi/corax/hansel-gretel/play.html",
            pinned: true
        },
        {
            caption: "Jack Welch: En Garde",
            image: "img/covers/en-garde.png",
            infoLink: "https://ifdb.tads.org/viewgame?id=7btsk9iqqku2t8g9",
            pinned: true
        },
        {
            caption: "Jack Welch: Re: Dragon",
            image: "img/covers/re-dragon.png",
            infoLink: "https://ifdb.tads.org/viewgame?id=qm3t0xblg4rqfii4",
            pinned: true
        },
        {
            caption: "J. Francisco Martín Lisaso: La pequeña cerillera",
            image: "img/covers/cerillera.png",
            infoLink: "https://jomali.itch.io/la-pequenna-cerillera",
            pinned: true
        },
        {
            caption: "Jim Munroe: Guilded Youth",
            image: "img/covers/guilded-youth.gif",
            infoLink: "https://jimmunroe.net/guildedyouth/",
            pinned: true
        }
    ],

    // Add custom scripts here that would be placed in <script> tags
    scripts: [ 'https://buttons.github.io/buttons.js' ],

    /* On page navigation for the current documentation page */
    onPageNav: 'separate',

    /* Open Graph and Twitter card images */
    ogImage: 'img/vorple-gray-300x177.png',
    twitterImage: 'img/vorple-gray-300x177.png',

    // You may provide arbitrary config keys to be used as needed by your
    // template. For example, if you need your repo's URL...
    //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
