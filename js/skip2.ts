import { createSkip2Button, closeMenu, openMenu } from './skip2Button';
import { buildMenu } from './skip2Menu';
import { addCloseMenuOnClick, addDomChangeListener } from './eventListeners';

export type Skip2Config = {
  id: string;
  attachTo: HTMLElement;
  showOnLoad: boolean;
  buttonId?: string;
  menuId?: string;
  headers?: string;
  tooltipId?: string;
  landmarks?: string;
  buttonContent?: string | HTMLElement;
  reloadOnChange: boolean;
  addAccessKey: boolean;
  accessKey: string;
};
class Skip2 {
  config: Skip2Config;
  constructor(config: Skip2Config) {
    const defaultConfig: Skip2Config = {
      id: 'skip2',
      attachTo: document.getElementsByTagName('body')[0],
      showOnLoad: true,
      headers: 'h1, h2, h3, h4, h5, h6, [role=heading]',
      landmarks:
        'main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]',
      reloadOnChange: false,
      addAccessKey: false,
      accessKey: '0',
    };
    this.config = { ...defaultConfig, ...config };
    this.config.menuId = this.config.id + '_menu';
    this.config.buttonId = this.config.id + '_button';
    this.config.tooltipId = this.config.id + '_tooltip';

    this.update = this.update.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  static version = 'VERSION CANNOT BE DETERMINED'; // Note - this is replace on build

  getConfig() {
    return this.config;
  }

  init() {
    // Load DOM change listener
    addDomChangeListener(this.config, this.update);

    // Add listener to close menu
    addCloseMenuOnClick(this.config);
    this._add();
  }

  _add() {
    // builds the skip2 container
    const skip2 = document.createDocumentFragment();
    const skip2Wrapper = document.createElement('div');
    skip2.appendChild(skip2Wrapper);

    skip2Wrapper.id = this.config.id;
    if (!this.config.showOnLoad) {
      skip2Wrapper.classList.add('skip2-hidden');
    }

    // builds the button
    const skip2Button = createSkip2Button(this.config);
    skip2Wrapper.appendChild(skip2Button);

    const menu = buildMenu(this.config);

    if (menu === null) {
      // eslint-disable-next-line no-console
      console.warn(
        'No landmarks or headers found  - skipmenu could not be built'
      );
      return;
    }

    // Append menu items and attach event listeners
    skip2Wrapper.appendChild(menu);
    this.config.attachTo.prepend(skip2Wrapper);
  }

  update() {
    const currentMenu = document.getElementById(this.config.menuId);
    const updatedMenu = buildMenu(this.config);
    if (currentMenu && updatedMenu) {
      const currentMenu = document.getElementById(this.config.menuId);
      currentMenu.parentNode.replaceChild(updatedMenu, currentMenu);
    }
    if (updatedMenu && !currentMenu) {
      this._add();
    }
    if (!updatedMenu && currentMenu) {
      this.remove();
    }
  }

  open() {
    openMenu(this.getConfig());
  }

  close() {
    closeMenu(this.getConfig());
  }

  remove() {
    const skip2 = document.getElementById(this.config.id);
    if (skip2) {
      skip2.remove();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.Skip2 = Skip2;
