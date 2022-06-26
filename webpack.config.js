/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs-extra');
const git = require('git-last-commit');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const dayjs = require('dayjs');
const packageJSON = require('./package.json');
const createBookmarklet = require('./utils/createBookmarklet.js');

let entry = {};
// let htmlFiles = [];

/**************** OUTPUT (aka build) DIRECTORY ***************** */
const outputDir = 'dist';
const cssDir = 'css';
const jsDir = 'js';

/**************** FILES TO BE COMPRESSED ***************** */
entry = {
  // List all js/css/scss you want compressed
  skipMenu: './js/skipMenu.ts',
  full: ['./scss/skipMenu-full.scss'],
  bootstrap: ['./scss/skipMenu-bootstrap.scss'],
  patternfly: ['./scss/skipMenu-patternfly.scss'],
};

module.exports = {
  //context: __dirname,
  mode: 'development',
  entry: entry,

  output: {
    path: path.resolve(__dirname, outputDir),
    filename: `js/[name].js`,
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'testPages'),
    },
    compress: true,
    port: 9000,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/skipMenu-[name].css`,
      chunkFilename: `css/[id].css`,
    }),
    new EventHooksPlugin({
      done: () => {
        git.getLastCommit(function (err, commit) {
          const hash = commit.shortHash;
          const date = dayjs.unix(commit.committedOn).format('YYYY-MM-DD');
          const version = packageJSON.version;
          const repo = packageJSON.repository;
          let header = fs.readFileSync('./headerContent/header.txt', 'utf8');
          header = header
            .replace('<VERSION>', version)
            .replace('<DATE>', date)
            .replace('<COMMIT>', hash)
            .replace('<REPO>', repo);

          // header = '';

          const jsFiles = fs.readdirSync(`./${outputDir}/${jsDir}`);
          jsFiles.forEach((filePath) => {
            if (!/map$/.test(filePath)) {
              let javascript = fs.readFileSync(
                `./${outputDir}/${jsDir}/${filePath}`,
                'utf8'
              );
              javascript = javascript.replace(
                'VERSION CANNOT BE DETERMINED',
                'v' + version
              );
              fs.writeFileSync(
                `./${outputDir}/${jsDir}/${filePath}`,
                header + javascript
              );
            }
          });

          const cssFiles = fs.readdirSync(`./${outputDir}/${cssDir}/`);

          cssFiles.forEach((filePath) => {
            if (!/map$/.test(filePath)) {
              const css = fs.readFileSync(
                `./${outputDir}/${cssDir}/${filePath}`,
                'utf8'
              );
              fs.writeFileSync(
                `./${outputDir}/${cssDir}/${filePath}`,
                header + css
              );
            }
          });

          const cssFull = fs.readFileSync(
            `./${outputDir}/${cssDir}/skipMenu-full.css`,
            'utf8'
          );

          const javascript = fs.readFileSync(
            `./${outputDir}/${jsDir}/skipMenu.js`,
            'utf8'
          );

          fs.writeFileSync(
            `./${outputDir}/${jsDir}/bookmarklet.js`,
            createBookmarklet(
              fs.readFileSync('./js/bookmarklet.js', 'utf8'),
              javascript,
              cssFull
            )
          );

          fs.writeFileSync(
            `./${outputDir}/${jsDir}/bookmarkletAuto.js`,
            createBookmarklet(
              fs.readFileSync('./js/bookmarkletAuto.js', 'utf8'),
              javascript,
              cssFull
            )
          );

          const bootstrapCSS = fs.readFileSync(
            `./${outputDir}/${cssDir}/skipMenu-bootstrap.css`,
            'utf8'
          );

          fs.writeFileSync(
            `./${outputDir}/${jsDir}/bookmarkletBootstrap.js`,
            createBookmarklet(
              fs.readFileSync('./js/bookmarkletAuto.js', 'utf8'),
              javascript,
              bootstrapCSS
            )
          );

          const patternflyCSS = fs.readFileSync(
            `./${outputDir}/${cssDir}/skipMenu-patternfly.css`,
            'utf8'
          );
          fs.writeFileSync(
            `./${outputDir}/${jsDir}/bookmarkletPatternfly.js`,
            createBookmarklet(
              fs.readFileSync('./js/bookmarkletAuto.js', 'utf8'),
              javascript,
              patternflyCSS
            )
          );

          // copy files
          fs.copySync(`./${outputDir}/`, `./testPages/${outputDir}/`);
          fs.copySync(`./${outputDir}/`, `./demoPage/${outputDir}/`);
        });
      },
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
