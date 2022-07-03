/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createskipMenuButton, closeMenu, openMenu } from './button';
import { buildMenu } from './menu';
import { addCloseMenuOnClick, addDomChangeListener } from './eventListeners';

export type SkipMenuConfig = {
  id?: string;
  attachTo?: HTMLElement;
  alwaysShow?: boolean; // This need to be changed to alwaysShow
  buttonId?: string;
  menuId?: string;
  menuContainerId?: string;
  headers?: string | false;
  headings?: string | false;
  tooltipId?: string;
  landmarks?: string | false;
  reloadOnChange?: boolean;
  useAccessKey?: boolean;
  accessKey?: string;
  tabIndex?: number | null;
  isRemoved?: boolean; // This is used internally and should not be called directly
  ignoreClass?: string;
  text?: {
    buttonLabel?: string;
    headingsLabel?: string;
    landmarksLabel?: string;
    tooltipLabel?: string;
    controlKeyLabel?: string;
    optionKeyLabel?: string;
    altKeyLabel?: string;
    shiftKeyLabel?: string;
    mainLabel?: string;
    searchLabel?: string;
    navigationLabel?: string;
    regionLabel?: string;
    complementaryLabel?: string;
    bannerLabel?: string;
    footerLabel?: string;
    sectionLabel?: string;
    formLabel?: string;
  };
  ensureAbsoluteParent?: boolean;
  theme?: 'bootstrap' | 'patternfly' | 'full' | undefined;
};

export type SkipMenuConfigFull = {
  id: string;
  attachTo: HTMLElement;
  alwaysShow: boolean; // This need to be changed to alwaysShow
  buttonId: string;
  menuId: string;
  menuContainerId: string;
  mutationObserver: MutationObserver | null;
  headers: string | false;
  headings: string | false;
  tooltipId: string;
  landmarks: string | false;
  reloadOnChange: boolean;
  useAccessKey: boolean;
  accessKey: string;
  tabIndex: number | null;
  isRemoved: boolean; // This is used internally and should not be called directly
  ignoreClass: string;
  text: {
    buttonLabel: string;
    headingsLabel: string;
    landmarksLabel: string;
    tooltipLabel: string;
    controlKeyLabel: string;
    optionKeyLabel: string;
    altKeyLabel: string;
    shiftKeyLabel: string;
    mainLabel: string;
    searchLabel: string;
    navigationLabel: string;
    regionLabel: string;
    complementaryLabel: string;
    bannerLabel: string;
    footerLabel: string;
    sectionLabel: string;
    formLabel: string;
  };
  ensureAbsoluteParent?: boolean;
};

const defaultConfig: SkipMenuConfigFull = {
  id: 'skipMenu',
  attachTo: document.getElementsByTagName('body')[0],
  alwaysShow: true,
  // headers: 'h1, h2, h3, h4, h5, h6, [role=heading]',
  headings: 'h1, h2, h3, h4, h5, h6, [role=heading]',
  landmarks:
    'main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]',
  reloadOnChange: false,
  useAccessKey: false,
  accessKey: '0',
  tabIndex: null,
  isRemoved: false,
  ignoreClass: 'skipMenu-ignore',
  text: {
    buttonLabel: 'Skip to content',
    headingsLabel: 'Headings',
    landmarksLabel: 'Landmarks',
    tooltipLabel: 'Shortcut: ',
    controlKeyLabel: 'Control',
    optionKeyLabel: 'Option',
    altKeyLabel: 'Alt',
    shiftKeyLabel: 'Shift',
    mainLabel: 'Main',
    searchLabel: 'Search',
    navigationLabel: 'Navigation',
    regionLabel: 'Region',
    complementaryLabel: 'Complementary',
    bannerLabel: 'Banner',
    footerLabel: 'Footer',
    sectionLabel: 'Section',
    formLabel: 'Form',
  },
  ensureAbsoluteParent: true,
  buttonId: '',
  menuId: '',
  menuContainerId: '',
  headers: '',
  tooltipId: '',
  mutationObserver: null,
};

export class SkipMenu {
  config: SkipMenuConfigFull;

  constructor(config: SkipMenuConfig) {
    // @ts-ignore
    this.config = { ...defaultConfig, ...config };

    // This is to support deprecated headers configuration
    if (config?.headers) {
      this.config.headings = config.headers;
    }

    if (config?.text) {
      this.config.text = { ...defaultConfig.text, ...config.text };
    }
    this.config.menuId = this.config.id + '_menu';
    this.config.menuContainerId = this.config.menuId + '-container';
    this.config.buttonId = this.config.id + '_button';
    this.config.tooltipId = this.config.id + '_tooltip';

    this.update = this.update.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  static version = 'VERSION CANNOT BE DETERMINED'; // Note - this is replaced on build

  getConfig() {
    return this.config;
  }

  init() {
    // Load DOM change listener
    addDomChangeListener(this.config, this.update, (obv) => {
      this.config.mutationObserver = obv;
    });

    // Add listener to close menu
    addCloseMenuOnClick(this.config);
    this._add();
  }

  _add(): void | null {
    // builds the skipMenu container
    if (this.config.isRemoved) {
      return null;
    }
    const skipMenu = document.createDocumentFragment();
    const skipMenuWrapper = document.createElement('div');
    skipMenu.appendChild(skipMenuWrapper);

    skipMenuWrapper.id = this.config.id;
    skipMenuWrapper.setAttribute('data-skip-menu', 'true');
    if (!this.config.alwaysShow) {
      skipMenuWrapper.classList.add('skipMenu-hidden');
    }

    // builds the button
    const skipMenuButton = createskipMenuButton(this.config);
    skipMenuWrapper.appendChild(skipMenuButton);

    const menu = buildMenu(this.config);

    if (menu === null) {
      // eslint-disable-next-line no-console
      console.warn(
        'No landmarks or headings found  - skipmenu could not be built'
      );
      return;
    }

    const menuContainer = document.createElement('div');
    menuContainer.id = this.config.menuContainerId;
    menuContainer.classList.add('dropdown-menu');
    menuContainer.style.display = 'none';

    menuContainer.appendChild(menu);

    // Append menu items and attach event listeners
    skipMenuWrapper.appendChild(menuContainer);

    const attachToStyles = window.getComputedStyle(this.config.attachTo);

    if (
      this.config.ensureAbsoluteParent &&
      this.config.attachTo.tagName.toLocaleLowerCase() !== 'body' &&
      !['sticky', 'absolute', 'fixed', 'relative', '-webkit-sticky'].some(
        (style) => style === attachToStyles.getPropertyValue('position')
      )
    ) {
      this.config.attachTo.style.position = 'relative';
    }
    this.config.attachTo.prepend(skipMenuWrapper);
  }

  update() {
    const currentMenu = document.getElementById(this.config.menuId);
    const updatedMenu = buildMenu(this.config);

    if (currentMenu && updatedMenu && !currentMenu.isEqualNode(updatedMenu)) {
      const focusedElement = document.activeElement;
      currentMenu.setAttribute('aria-busy', 'true');
      currentMenu.replaceWith(updatedMenu);
      currentMenu.setAttribute('aria-busy', 'false');
      updatedMenu.querySelectorAll('[role="menuitem"]').forEach((item) => {
        if (focusedElement && focusedElement.isEqualNode(item)) {
          (item as HTMLElement).focus();
        }
      });
    }
    if (updatedMenu && !currentMenu) {
      this._add();
    }
    if (!updatedMenu && currentMenu) {
      this._remove();
    }
  }

  open() {
    openMenu(this.getConfig());
  }

  close() {
    closeMenu(this.getConfig());
  }

  _remove() {
    const skipMenu = document.getElementById(this.config.id);
    if (skipMenu) {
      skipMenu.remove();
    }
  }

  remove() {
    this.config.isRemoved = true;
    this.config.mutationObserver?.disconnect();
    this.config.mutationObserver = null;
    this._remove();
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.SkipMenu = SkipMenu;
