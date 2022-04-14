import { buildMenuSection } from "./menuSection";
import { createSkip2Button, toggleMenu } from "./skip2Button";

export type Skip2Config = {
  id: string;
  attachTo: HTMLElement;
  showOnLoad: boolean;
  buttonId?: string;
  menuId?: string;
  headers?: NodeListOf<Element>;
  landmarks?: NodeListOf<Element>;
  buttonContent?: string | HTMLElement;
};
class Skip2 {
  config: any;
  constructor(config: Skip2Config) {
    const defaultConfig: Skip2Config = {
      id: "skip2",
      attachTo: document.getElementsByTagName("body")[0],
      showOnLoad: true,
      headers: document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, [role=heading]"
      ),
      landmarks: document.querySelectorAll(
        "main, [role=main], [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary], body > header, [role=banner], body > footer, [role=contentinfo]"
      ),
    };
    this.config = { ...defaultConfig, ...config };
    this.config.menuId = this.config.id + "_menu";
    this.config.buttonId = this.config.id + "_button";
  }
  static version = "VERSION CANNOT BE DETERMINED";

  _buildMenu() {
    //document.getElementById(`${this.config.id}_menu`).innerHTML = "";
    const headerSection = buildMenuSection(
      this.config.headers,
      "Headings",
      true,
      this.config
    );
    const landmarkSection = buildMenuSection(
      this.config.landmarks,
      "Landmarks",
      false,
      this.config
    );
    document.getElementById(this.config.menuId).appendChild(landmarkSection);
    document.getElementById(this.config.menuId).appendChild(headerSection);

    this._attachMenuItemEvent();
  }

  _attachMenuItemEvent() {
    var menuitemNodes = document
      .getElementById(this.config.menuId)
      .querySelectorAll("[role=menuitem");

    menuitemNodes.forEach((item, index) => {
      item.addEventListener(
        "keydown",
        (e: KeyboardEvent) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.stopPropagation();
            e.preventDefault();
            menuitemNodes.forEach((item) => {
              (item as HTMLElement).tabIndex = -1;
            });
            if (e.key === "ArrowDown") {
              if (index === menuitemNodes.length - 1) {
                (menuitemNodes[0] as HTMLElement).focus();
              } else {
                (menuitemNodes[index + 1] as HTMLElement).focus();
              }
            }
            if (e.key === "ArrowUp") {
              const menuIndex =
                index === 0 ? menuitemNodes.length - 1 : index - 1;
              (menuitemNodes[menuIndex] as HTMLElement).focus();
            }
          }
        },
        false
      );
    });
  }

  add() {
    // builds the skip2 container
    const skip2 = document.createElement("div");
    skip2.id = this.config.id;
    if (!this.config.showOnLoad) {
      skip2.classList.add("skip2Hidden");
    }

    // builds the initial menu
    const menu = document.createElement("div");
    menu.setAttribute("role", "menu");
    menu.classList.add("dropdown-menu");
    menu.id = this.config.menuId;

    // builds the button
    const skip2Button = createSkip2Button(this.config);

    // Attach all the things:
    skip2.appendChild(skip2Button);
    skip2.append(menu);
    this.config.attachTo.prepend(skip2);

    this._buildMenu();
  }

  remove() {
    // removes the menu entirely
  }

  update() {
    // empties the content of the main menu and rebuilds it
    // only update the menu IF the html has changed
  }
}

// @ts-ignore
window.Skip2 = Skip2;
