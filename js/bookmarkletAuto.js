javascript: (() => {
  const css = document.createElement('style');
  css.innerHTML = '/*<CSS>*/';

  document.getElementsByTagName('head')[0].appendChild(css);
  /*<Javascript>*/
  const skipMenu = new SkipMenu({ useAccessKey: true, reloadOnChange: true });
  skipMenu.init();
})();
