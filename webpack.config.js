/* eslint-disable global-require */
const autoprefixer = require('autoprefixer');
const path = require('path');
const merge = require('webpack-merge');

const defaultConfig = {
  module: {
    rules: [
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: true,
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [],
  resolve: {
    modules: ['node_modules', 'client'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      Src: path.resolve(__dirname, 'client'),
      Containers: path.resolve(__dirname, 'client', 'containers'),
      Components: path.resolve(__dirname, 'client', 'components'),
      Actions: path.resolve(__dirname, 'client', 'actions'),
      Reducers: path.resolve(__dirname, 'client', 'reducers'),
      Middlewares: path.resolve(__dirname, 'client', 'middleware'),
      Styles: path.resolve(__dirname, 'client', 'styles'),
      Utils: path.resolve(__dirname, 'client', 'utils'),
      Selectors: path.resolve(__dirname, 'client', 'selectors'),
    },
  },
};

const isProductionEnv = process.env.NODE_ENV === 'production';

let webpackConfig = null;

if (isProductionEnv) {
  const prodOptions = require('./webpack.prod');
  const prodConfig = merge(defaultConfig, prodOptions);
  webpackConfig = Object.assign({}, prodConfig);
} else {
  const devOptions = require('./webpack.dev');
  const devConfig = merge(defaultConfig, devOptions);
  webpackConfig = Object.assign({}, devConfig);
}

module.exports = webpackConfig;
