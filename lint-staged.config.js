module.exports = {
  '**/*.{ts,tsx,js,jsx}': [
    (jsFiles) => jsFiles.map((jsFile) => `npm run lint:js ${jsFile}`), // check files
  ],
  '**/*.{scss}': [
    (scssFiles) => scssFiles.map((scssFile) => `npm run lint:scss ${scssFile}`), // check files
  ],
  '**/*.{html,json,md}': [
    (htmlFiles) => htmlFiles.map((htmlFile) => `npm run prettier ${htmlFile}`), // check files
  ],
};
