const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(
        ['import', 
            { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }
        ], // change importing css to less
        config,
    );
    return config;
};