const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const productionEnv = new webpack.EnvironmentPlugin({ NODE_ENV: 'production' });

const pathsToClean = [
  'public/*.html',
  'public/*.js',
  'public/*.gz',
  'public/*.css',
  'public/*.map',
  'public/*.jpg',
  'public/*.ico',
  'public/views/*.pug',
];

const cleanOptions = {
  root: path.resolve(__dirname),
  exclude: [],
  verbose: true,
  dry: false,
};

const uglifySetup = new UglifyJSPlugin({
  uglifyOptions: {
    ie8: false,
    ecma: 8,
    output: {
      comments: false,
      beautify: false,
    },
    compress: { drop_console: true },
    warnings: false,
  },
  cache: true,
  parallel: true,
});

module.exports = {
  mode: 'production',
  entry: {
    react: ['react', 'react-dom', 'react-router-dom'],
    app: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/public/',
  },
  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    minimizer: [
      uglifySetup,
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: { chunks: 'all' },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'client'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.DefinePlugin({ productionEnv }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    uglifySetup,
    new MinifyPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Readable - Rafael Maia Chieregatto',
      filename: './views/index.pug',
      template: './client/views/prod/index.pug',
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),
    new HtmlWebpackPugPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new WebpackMd5Hash(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      filename: '[path].gz[query]',
      algorithm: 'gzip',
    }),
  ],

  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};
