'use strict';
let path = require('path');
const projectRoot = process.cwd();
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

let REACT_WEBPACK_ENV = process.env.REACT_WEBPACK_ENV;
let envMap = {
    qa: 'qa',
    rd: 'dev'
};

if (envMap[REACT_WEBPACK_ENV]) {
    REACT_WEBPACK_ENV = envMap[REACT_WEBPACK_ENV]
}

module.exports = {
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../assets'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    },
    externals: {
        'react':     'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules:    defaultSettings.nodePath,
            store:      `${defaultSettings.srcPath}/store`,
            state:      `${defaultSettings.srcPath}/store/state`,
            var:        `${defaultSettings.srcPath}/store/state/var`,
            business:   `${defaultSettings.srcPath}/containers/business`,
            operate:    `${defaultSettings.srcPath}/containers/operate`,
            view:       `${defaultSettings.srcPath}/containers/view`,
            reviewTem:  `${defaultSettings.srcPath}/containers/reviewTem`,
            actions:    `${defaultSettings.srcPath}/store/actions`,
            components: `${defaultSettings.srcPath}/components`,
            compEdit:   `${defaultSettings.srcPath}/containers/operate/edit/Module`,
            compEditB:  `${defaultSettings.srcPath}/containers/business/edit/Module`,
            public:     `${defaultSettings.srcPath}/public`,
            styles:     `${defaultSettings.srcPath}/styles`,
            images:     `${defaultSettings.srcPath}/images`,
            services:   `${defaultSettings.srcPath}/services`,
            server:     `${defaultSettings.srcPath}/server`,
            config:     `${defaultSettings.srcPath}/config/` + (REACT_WEBPACK_ENV || 'dev')
        }
    },
    module: {},
};
