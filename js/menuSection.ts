import { isVisible, focusNextElement } from "./utilities";
import { toggleMenu } from "./skip2Button";
import { Skip2Config } from "./skip2";

/* ********************************** */

const addMenuItemEvents = (
  listItem: HTMLDivElement,
  targetElement: HTMLElement,
  config: Skip2Config
) => {
  const menuId = config.menuId;
  const buttonId = config.buttonId;
  listItem.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    (targetElement as HTMLElement).focus();
    toggleMenu(config, true);
  });
  // TODO - move logic to add listeners to a new method
  listItem.addEventListener("keydown", (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") {
      (targetElement as HTMLElement).focus();
      toggleMenu(config, true);
    }
    if (e.key === "Tab") {
      toggleMenu(config, true);
      if (e.shiftKey) {
        document.getElementById(buttonId).focus();
      } else {
        focusNextElement(buttonId);
      }
    }
  });
  return listItem;
};

/* ********************************** */

const buildMenuItem = (
  element: HTMLElement,
  // menuId: string,
  depth: number,
  config: Skip2Config
) => {
  let listItem = document.createElement("div");
  let listItemText = (element as HTMLElement).innerText;

  if (depth) {
    listItem.className = `${config.id}_menu_header-level-${depth}`;
    listItemText = `${depth}) ${listItemText}`;
  }

  var text = document.createTextNode(listItemText);
  listItem.appendChild(text);
  listItem.setAttribute("role", "menuitem");
  listItem.classList.add("dropdown-item");
  listItem.setAttribute("tabindex", "-1");

  listItem = addMenuItemEvents(listItem, element, config);
  return listItem;
};

/* ********************************** */

export const buildMenuSection = (
  elements: NodeListOf<Element>,
  sectionTitle: string,
  hasLevels: boolean = false,
  config: Skip2Config
) => {
  const container = document.createElement("div");
  container.setAttribute("role", "group");
  const containerTitle = document.createElement("div");
  containerTitle.setAttribute("role", "separator");
  containerTitle.appendChild(document.createTextNode(sectionTitle));
  container.appendChild(containerTitle);

  elements.forEach((element) => {
    if (isVisible(element as HTMLElement)) {
      let depth = parseInt(element.tagName.substring(1));
      if (element.getAttribute("aria-level")) {
        depth = parseInt(element.getAttribute("aria-level"));
      }

      // KKD need to check and see if tabindex is already set
      (element as HTMLElement).tabIndex = -1;
      container.appendChild(
        buildMenuItem(element as HTMLElement, depth, config)
      );
    }
  });
  return container;
};
