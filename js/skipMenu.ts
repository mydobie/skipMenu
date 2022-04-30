import { createskipMenuButton, closeMenu, openMenu } from './button';
import { buildMenu } from './menu';
import { addCloseMenuOnClick, addDomChangeListener } from './eventListeners';

export type SkipMenuConfig = {
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
class SkipMenu {
  config: SkipMenuConfig;
  constructor(config: SkipMenuConfig) {
    const defaultConfig: SkipMenuConfig = {
      id: 'skipMenu',
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
    // builds the skipMenu container
    const skipMenu = document.createDocumentFragment();
    const skipMenuWrapper = document.createElement('div');
    skipMenu.appendChild(skipMenuWrapper);

    skipMenuWrapper.id = this.config.id;
    if (!this.config.showOnLoad) {
      skipMenuWrapper.classList.add('skipMenu-hidden');
    }

    // builds the button
    const skipMenuButton = createskipMenuButton(this.config);
    skipMenuWrapper.appendChild(skipMenuButton);

    const menu = buildMenu(this.config);

    if (menu === null) {
      // eslint-disable-next-line no-console
      console.warn(
        'No landmarks or headers found  - skipmenu could not be built'
      );
      return;
    }

    // Append menu items and attach event listeners
    skipMenuWrapper.appendChild(menu);
    this.config.attachTo.prepend(skipMenuWrapper);
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
    const skipMenu = document.getElementById(this.config.id);
    if (skipMenu) {
      skipMenu.remove();
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.SkipMenu = SkipMenu;
