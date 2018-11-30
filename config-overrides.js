const { injectBabelPlugin } = require('react-app-rewired');
// const rewireLess = require('react-app-rewire-less');
const rewireSass = require('react-app-rewire-sass');

module.exports = function override(config, env) {
    // do stuff with the webpack config...
    config = injectBabelPlugin(
        ['import', 
            { libraryName: 'antd', libraryDirectory: 'es', style: true }
        ], // change importing css to less
        config,
    );
    config = rewireSass.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
        javascriptEnabled: true,
    })(config, env);
    return config;
};