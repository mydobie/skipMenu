/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const git = require('git-last-commit');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const dayjs = require('dayjs');
const packageJSON = require('./package.json');

let entry = {};
// let htmlFiles = [];

/**************** OUTPUT (aka build) DIRECTORY ***************** */
const outputDir = 'dist';

/**************** FILES TO BE COMPRESSED ***************** */
// COMPRESS A GIVEN LIST OF FILES
entry = {
  // List all js/css/scss you want compressed
  skip2: './js/skip2.ts',
  skip2Styles: ['./scss/skip2.scss'],
};

// COMPRESS ALL FILES IN A DIRECTORY
// If you want Webpack to automatically compress all files in a directory uncomment the following code:

/*
const glob = require('glob');
const setEntry = fileArray => {
  return fileArray.reduce((entryObj, file) => {
    let fileName = path.parse(file).name.split('.');
    entryObj[fileName] = file;
    return entryObj;
  }, {});
};

const files = glob.sync('./js/*.js'); // be sure to change the directory and extension
entry = setEntry(files);

// If you have other directories you want to include,  follow this pattern

//const cssFiles = glob.sync('./scss/*.scss'); // be sure to change the directory and extension
//const entryCSS = setEntry(cssFiles);
//entry = Object.assign(entry, entryCSS);

*/

/* ****************************************** */

/**************** HTML FILES/INCLUDES TO BE UPDATED ***************** */
// The following is a list of files that should have the html/css paths updated

// htmlFiles = ["./page2.html", "./page1.html"];

/* ****************************************** */

module.exports = {
  //context: __dirname,

  entry: entry, //see  FILES TO BE COMPRESSED above.  Be sure to comment out the entry list above.

  output: {
    path: path.resolve(__dirname, outputDir),
    //filename: `js/[name].${gitCommit}.js`,
    filename: `js/[name].js`,
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts'],
  },
  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      // filename: `css/[name].${gitCommit}.css`,
      // chunkFilename: `css/[id].${gitCommit}.css`,
      filename: `css/skip2.css`,
      chunkFilename: `css/[id].css`,
    }),
    new EventHooksPlugin({
      done: () => {
        // replace css and js in html include new gitCommit
        // const pattern = new RegExp(
        //   `(${outputDir}\/(js|css)\/[a-zA-Z0-9.-_]+\.)([a-zA-Z0-9]{7})(\.(js|css))`,
        //   "g"
        // );
        // htmlFiles.forEach((filePath) => {
        //   const file = fs.readFileSync(filePath, "utf8");
        //   const newFile = file.replace(pattern, `$1${gitCommit}$4`);
        //   fs.writeFileSync(filePath, newFile);
        // });

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

          let javascript = fs.readFileSync('./dist/js/skip2.js', 'utf8');
          javascript = javascript.replace(
            'VERSION CANNOT BE DETERMINED',
            'v' + version
          );

          const css = fs.readFileSync('./dist/css/skip2.css', 'utf8');
          fs.writeFileSync('./dist/js/skip2.js', header + javascript);
          fs.writeFileSync('./dist/css/skip2.css', header + css);
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
