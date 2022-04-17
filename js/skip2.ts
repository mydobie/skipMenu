import { buildMenuSection } from './menuSection';
import { createSkip2Button, toggleMenu } from './skip2Button';
import { buildMenu } from './skip2Menu';

export type Skip2Config = {
  id: string;
  attachTo: HTMLElement;
  showOnLoad: boolean;
  buttonId?: string;
  menuId?: string;
  headers?: string;
  landmarks?: string;
  buttonContent?: string | HTMLElement;
  reloadOnChange: boolean;
};
class Skip2 {
  config: any;
  constructor(config: Skip2Config) {
    const defaultConfig: Skip2Config = {
      id: 'skip2',
      attachTo: document.getElementsByTagName('body')[0],
      showOnLoad: true,
      headers: 'h1, h2, h3, h4, h5, h6, [role=heading]',
      landmarks:
        'main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]',
      reloadOnChange: false,
    };
    this.config = { ...defaultConfig, ...config };
    this.config.menuId = this.config.id + '_menu';
    this.config.buttonId = this.config.id + '_button';

    this.update = this.update.bind(this);
    this.getConfig = this.getConfig.bind(this);
  }

  static version = 'VERSION CANNOT BE DETERMINED'; // Note - this is replace on build

  getConfig() {
    return this.config;
  }

  add() {
    // builds the skip2 container
    const skip2 = document.createDocumentFragment();
    const skip2Wrapper = document.createElement('div');
    skip2.appendChild(skip2Wrapper);

    skip2Wrapper.id = this.config.id;
    if (!this.config.showOnLoad) {
      skip2Wrapper.classList.add('skip2Hidden');
    }

    // builds the button
    const skip2Button = createSkip2Button(this.config);
    skip2Wrapper.appendChild(skip2Button);

    // builds the initial menu
    const menu = buildMenu(this.config);

    // Append menu items and attach event listeners
    skip2Wrapper.appendChild(menu);
    this.config.attachTo.prepend(skip2Wrapper);

    // Load DOM change listener
    if (this.config.reloadOnChange) {
      const obv = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            //@ts-ignore
            !mutation.target.closest(`#${this.getConfig().id}`) &&
            mutation.attributeName !== 'tabindex'
          ) {
            // */
            // console.log("******************************");
            // console.log("Mutation", mutation);
            // console.log(
            //   "Is header: ",
            //   (mutation.target as HTMLElement).querySelector(
            //     this.getConfig().headers
            //   )
            // );
            // // console.log("PARENT", mutation.target.parentNode);
            // console.log(
            //   "tagName",
            //   (mutation.target as HTMLHtmlElement).tagName
            // );
            // console.log(
            //   "Aria header",
            //   (mutation.target as HTMLElement).getAttribute("role")
            // );
            this.update();
          }
        });
      });
      obv.observe(document, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }

    // Add listener to close menu
    document.addEventListener('click', (e) => {
      // @ts-ignore
      if (!e.target.closest(`#${this.getConfig().id}`)) {
        toggleMenu(this.getConfig(), true);
      }
    });
  }

  update() {
    // do logic to see if the menu needs to be rebuilt
    const updatedMenu = buildMenu(this.config);
    const currentMenu = document.getElementById(this.config.menuId);
    currentMenu.parentNode.replaceChild(updatedMenu, currentMenu);
  }
}

// @ts-ignore
window.Skip2 = Skip2;
