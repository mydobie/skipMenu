import { buildMenuSection } from "./menuSection";
import { createSkip2Button } from "./skip2Button";
import { buildMenu } from "./skip2Menu";

export type Skip2Config = {
  id: string;
  attachTo: HTMLElement;
  showOnLoad: boolean;
  buttonId?: string;
  menuId?: string;
  headers?: string;
  landmarks?: string;
  buttonContent?: string | HTMLElement;
};
class Skip2 {
  config: any;
  constructor(config: Skip2Config) {
    const defaultConfig: Skip2Config = {
      id: "skip2",
      attachTo: document.getElementsByTagName("body")[0],
      showOnLoad: true,
      headers: "h1, h2, h3, h4, h5, h6, [role=heading]",
      landmarks:
        "main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]",
    };
    this.config = { ...defaultConfig, ...config };
    this.config.menuId = this.config.id + "_menu";
    this.config.buttonId = this.config.id + "_button";
  }
  static version = "VERSION CANNOT BE DETERMINED";

  // _buildMenu() {
  // if (document.getElementById(`${this.config.id}_menu`).innerHTML) {
  //   document.getElementById(`${this.config.id}_menu`).innerHTML = "";
  // }
  // const headerSection = buildMenuSection(
  //   document.querySelectorAll(this.config.headers),
  //   "Headings",
  //   true,
  //   this.config
  // );
  // const landmarkSection = buildMenuSection(
  //   document.querySelectorAll(this.config.landmarks),
  //   "Landmarks",
  //   false,
  //   this.config
  // );
  // document.getElementById(this.config.menuId).appendChild(landmarkSection);
  // document.getElementById(this.config.menuId).appendChild(headerSection);
  /*

steps

// two ways to do this - first is to save the sections and then compare after re-render
// second is to build the menu each time and compare before attaching


    */

  //  this._attachMenuItemEvent();
  // }

  // _attachMenuItemEvent() {
  //   var menuitemNodes = document
  //     .getElementById(this.config.menuId)
  //     .querySelectorAll("[role=menuitem");

  //   menuitemNodes.forEach((item, index) => {
  //     item.addEventListener(
  //       "keydown",
  //       (e: KeyboardEvent) => {
  //         if (e.key === "ArrowDown" || e.key === "ArrowUp") {
  //           e.stopPropagation();
  //           e.preventDefault();
  //           menuitemNodes.forEach((item) => {
  //             (item as HTMLElement).tabIndex = -1;
  //           });
  //           if (e.key === "ArrowDown") {
  //             if (index === menuitemNodes.length - 1) {
  //               (menuitemNodes[0] as HTMLElement).focus();
  //             } else {
  //               (menuitemNodes[index + 1] as HTMLElement).focus();
  //             }
  //           }
  //           if (e.key === "ArrowUp") {
  //             const menuIndex =
  //               index === 0 ? menuitemNodes.length - 1 : index - 1;
  //             (menuitemNodes[menuIndex] as HTMLElement).focus();
  //           }
  //         }
  //       },
  //       false
  //     );
  //   });
  // }

  add() {
    // builds the skip2 container
    const skip2 = document.createDocumentFragment();
    const skip2Wrapper = document.createElement("div");
    skip2.appendChild(skip2Wrapper);

    skip2Wrapper.id = this.config.id;
    if (!this.config.showOnLoad) {
      skip2Wrapper.classList.add("skip2Hidden");
    }

    // builds the button
    const skip2Button = createSkip2Button(this.config);
    skip2Wrapper.appendChild(skip2Button);

    // builds the initial menu
    const menuWrapper = document.createElement("div");
    menuWrapper.id = "menuWrapper";
    // const menu = document.createElement("div");
    // menu.setAttribute("role", "menu");
    // menu.classList.add("dropdown-menu");
    // menu.id = this.config.menuId;

    const menu = buildMenu(this.config);

    // Append menu items and attach event listeners
    menuWrapper.appendChild(menu);
    skip2Wrapper.append(menuWrapper);
    this.config.attachTo.prepend(skip2Wrapper);

    //  this._buildMenu(); // wondering if we can do this later - can the events be added while building the menu?
  }

  remove() {
    // removes the menu entirely
  }

  update() {
    // do logic to see if the menu needs to be rebuilt
    // const updatedMenu = this._buildMenu();
    // const currentMenu = document.getElementById(this.config.menuId);
    // currentMenu.parentNode.replaceChild(updatedMenu, currentMenu);
  }
}

// @ts-ignore
window.Skip2 = Skip2;
