/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

const skipMenu = new SkipMenu({
  useAccessKey: true,
  attachTo: document.querySelector('header'),
  reloadOnChange: true,
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
  if (!document.getElementById('myNewHeader')) {
    document.getElementById('newHeader').innerHTML =
      '<h2 class="h5" id="myNewHeader">!!! My new header !!!</h2>';
    skipMenu.update();
    // There is a known issue where update takes a moment
    setTimeout(() => {
      skipMenu.open();
    }, 10);
    document.getElementById('newHeaderButton').innerHTML = 'Clear new header';
  } else {
    document.getElementById('newHeader').innerHTML = '';
    skipMenu.update();
    document.getElementById('newHeaderButton').innerHTML = 'Add a new header';
  }
});

document.getElementById('startAddHeadings')?.addEventListener('click', () => {
  let counter = 0;
  document.getElementById('startAddHeadings').disabled = true;
  setTimeout(() => {
    skipMenu.open();
  }, 10);
  let interval = setInterval(() => {
    if (counter > 4) {
      clearInterval(interval);
      document.getElementById('startAddHeadings').disabled = false;
    } else {
      counter++;
      const newHeader = document.createElement('h4');
      newHeader.innerHTML = `!!! New Header ${counter}`;
      document.getElementById('autoHeadings').appendChild(newHeader);
    }
  }, 1000);
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
