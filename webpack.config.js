var path = require("path");
const webpack = require("webpack");
const prod = process.argv.indexOf('-p') !== -1;

module.exports = {
  context: __dirname,
  entry: "./app/assets/javascripts/api/pokemon_api_util.js",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js",
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ],
};
