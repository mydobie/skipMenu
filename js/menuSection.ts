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

const landMarkType = (element: HTMLElement) => {
  const tag = element.tagName;
  const role = element.getAttribute("role");

  switch (role) {
    case "main":
      return "Main";
    case "search":
      return "Search";
    case "navigation":
      return "Navigation";
    case "region":
      return "Region";
    case "complementary":
      return "Complementary";
    case "banner":
      return "Banner";
    case "contentinfo":
      return "Footer";
  }
  switch (tag.toLowerCase()) {
    case "main":
      return "Main";
    case "nav":
      return "Navigation";
    case "section":
      return "Section";
    case "form":
      return "Form";
    case "aside":
      return "Complementary";
    case "banner":
      return "Banner";
    case "footer":
      return "Footer";
  }
  return null;
};

const getMenuItemText = (element: HTMLElement) => {
  const landmark = landMarkType(element);
  let text = "";
  if (element.hasAttribute("aria-label")) {
    text = element.getAttribute("aria-label");
  } else if (element.hasAttribute("aria-labelledby")) {
    text = document.getElementById(
      element.getAttribute("aria-labelledby")
    ).innerText;
  } else if (element.hasAttribute("title")) {
    text = element.getAttribute("title");
  }

  if (landmark) {
    return text ? `${landmark}: ${text}` : landmark;
  } else {
    return text ? text : element.innerText;
  }
};

/* ********************************** */

const buildMenuItem = (
  element: HTMLElement,
  depth: number,
  config: Skip2Config
) => {
  let listItem = document.createElement("div");
  let listItemText = getMenuItemText(element);

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
