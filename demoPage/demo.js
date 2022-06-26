/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

const skipMenu = new SkipMenu({
  useAccessKey: true,
  attachTo: document.querySelector('header'),
});
skipMenu.init();

// Add version
const version = SkipMenu.version;
if (version) {
  document.querySelectorAll('.version').forEach((el) => {
    el.querySelector('span').innerHTML = version;
    el.querySelector('a')?.setAttribute(
      'href',
      `https://github.com/mydobie/skipMenu/releases/download/${version}/skipMenu-${
        version.split('v')[1]
      }.tgz`
    );
  });
}

// Set readme
document.querySelectorAll('.readMeURL').forEach((link) => {
  link.setAttribute(
    'href',
    `https://github.com/mydobie/skipMenu/blob/${version}/README.md#options`
  );
});

// Add new header
document.getElementById('newHeaderButton')?.addEventListener('click', () => {
  document.getElementById('newHeader').innerHTML =
    '<h2 class="h5">My new header</h2>';
  document.getElementById('newHeaderButton').style.display = 'none';
  document.getElementById('removeHeaderButton').style.display = 'block';
  skipMenu.update();
  // There is a known issue where update is a fraction of a second to
  // complete building menu
  setTimeout(() => {
    skipMenu.open();
  }, 10);
});

// Remove new header
document.getElementById('removeHeaderButton')?.addEventListener('click', () => {
  document.getElementById('newHeader').innerHTML = '';
  document.getElementById('newHeaderButton').style.display = 'block';
  document.getElementById('removeHeaderButton').style.display = 'none';
  skipMenu.update();
});

const setBookmarklet = (id, url, hideIfFail) => {
  fetch(url, { method: 'GET' })
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(`#${id}`).setAttribute('href', data);
    })
    .catch((/* error */) => {
      if (hideIfFail) {
        document.querySelector(`#${id}`).style.display = 'none';
      }
    });
};
