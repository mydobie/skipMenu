/* eslint-disable @typescript-eslint/no-var-requires */
// This file is used to create a tar file of the built application
/* eslint-disable no-console */
const { exec } = require('child_process');

const fs = require('fs');

const packagedata = fs.readFileSync('package.json');
const packageJson = JSON.parse(packagedata);
const { version /* , name */ } = packageJson;
// const fileName = `${name.replace('/', '--')}-${version}.tgz`;

const fileName = `skipMenu-${version}.tgz`;

const archiveDirectory = 'archive/'; // Note, trailing / is required.  set to '' to save at the root of the project

console.log('Starting archive process.  This can take a while.');

exec(
  `npm run build && mkdir -p ${archiveDirectory} && cd dist && tar --exclude='./__fixtures__' -cvzf ../${archiveDirectory}${fileName} .`,
  (err /* , stdout, stderr */) => {
    if (err) {
      // some err occurred
      console.error(`File not created. ERROR:${err}`);
      process.exitCode = 1;
    } else {
      // console.log(`stdout: ${stdout}`);
      // console.log(`stderr: ${stderr}`);
      console.log(`${archiveDirectory}${fileName} created.`);
      process.exitCode = 0;
    }
  }
);

// How to manually un-tar an archive
// tar -zxvf myTar.tgz
