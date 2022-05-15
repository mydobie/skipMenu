// eslint-disable-next-line @typescript-eslint/no-var-requires
const strip = require('strip-comments');

const createBookmarklet = (bookmarkcode, javascript, css) => {
  javascript = strip(javascript);
  css = strip(css).replace(/(\r\n|\n|\r)/gm, '');
  let returnString = bookmarkcode
    .replace('/*<Javascript>*/', javascript)
    .replace('/*<CSS>*/', css);

  returnString = strip(returnString);
  returnString = returnString.replace(/(\r\n|\n|\r)/gm, '');
  return returnString;
};

module.exports = createBookmarklet;
