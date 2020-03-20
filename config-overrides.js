const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { rewireWorkboxGenerate } = require("react-app-rewire-workbox");

module.exports = function override(config, env) {

    config = rewireWorkboxGenerate()(config, env);
    
    plugins = [
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: true,
        }),
    ];

    config.plugins = [...config.plugins, ...plugins];

    return config;

}