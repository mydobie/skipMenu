import { buildMenuSection } from "./menuSection";
import { createSkip2Button, toggleMenu } from "./skip2Button";
import { isVisible, isInMenu, headers, focusNextElement } from "./utilities";

class Skip2 {
  config: any;
  constructor(config: any) {
    const defaultConfig = {
      id: "skip2",
      attachTo: document.getElementsByTagName("body")[0],
    };
    this.config = { ...defaultConfig, ...config };
  }

  _buildMenu() {
    //document.getElementById(`${this.config.id}_menu`).innerHTML = "";
    const headerSection = buildMenuSection(
      this.config.id,
      headers,
      "Headers",
      true
    );
    document
      .getElementById(`${this.config.id}_menu`)
      .appendChild(headerSection);

    this._attachMenuItemEvent();
  }

  _attachMenuItemEvent() {
    var menuitemNodes = document
      .getElementById(`${this.config.id}_menu`)
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
                //  menuitemNodes[0].tabIndex = 0;
                (menuitemNodes[0] as HTMLElement).focus();
              } else {
                // menuitemNodes[index + 1].tabIndex = 0;
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
    // skip2.classList.add("skip2"); // TODO is this really needed
    skip2.id = `${this.config.id}`;

    // builds the initial menu
    const menu = document.createElement("div");
    menu.setAttribute("role", "menu");
    // menu.classList.add(`${this.config.id}_menu`); // TODO is this really needed
    menu.classList.add("dropdown-menu");
    menu.id = `${this.config.id}_menu`;

    // builds the button
    const skip2Button = createSkip2Button(`${this.config.id}`);

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
