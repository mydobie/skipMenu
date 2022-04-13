import { isVisible, focusNextElement } from "./utilities";
import { toggleMenu } from "./skip2Button";
import { Skip2Config } from "./skip2";

/* ********************************** */

const addMenuItemEvents = (
  listItem: HTMLDivElement,
  targetElement: HTMLElement,
  menuId: string,
  config: Skip2Config
) => {
  listItem.addEventListener("click", (event) => {
    event.stopPropagation();
    event.preventDefault();
    (targetElement as HTMLElement).focus();
    toggleMenu(`${menuId}_menu`, `${menuId}_button`, true);
  });
  // TODO - move logic to add listeners to a new method
  listItem.addEventListener("keydown", (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.key === "Enter" || e.key === " ") {
      (targetElement as HTMLElement).focus();
      toggleMenu(`${menuId}_menu`, `${menuId}_button`, true);
    }
    if (e.key === "Tab") {
      toggleMenu(`${menuId}_menu`, `${menuId}_button`, true);
      if (e.shiftKey) {
        document.getElementById(`${menuId}_button`).focus();
      } else {
        focusNextElement(`${menuId}_button`);
        if (!config.showOnLoad) {
          document.getElementById(menuId).classList.add("skip2Hidden");
        }
      }
    }
  });
  return listItem;
};

/* ********************************** */

const buildMenuItem = (
  element: HTMLElement,
  menuId: string,
  depth: number,
  config: Skip2Config
) => {
  let listItem = document.createElement("div");
  let listItemText = (element as HTMLElement).innerText;

  if (depth) {
    listItem.className = `${menuId}_header-level-${depth}`;
    listItemText = `${depth}) ${listItemText}`;
  }

  var text = document.createTextNode(listItemText);
  listItem.appendChild(text);
  listItem.setAttribute("role", "menuitem");
  listItem.classList.add("dropdown-item");
  listItem.setAttribute("tabindex", "-1");

  listItem = addMenuItemEvents(listItem, element, menuId, config);
  return listItem;
};

/* ********************************** */

export const buildMenuSection = (
  menuId: string,
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
        buildMenuItem(element as HTMLElement, menuId, depth, config)
      );
    }
  });
  return container;
};
