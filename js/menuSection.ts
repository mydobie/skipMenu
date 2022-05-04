import { isVisible, focusNextElement, isFocusable } from './utilities';
import { closeMenu } from './button';
import { SkipMenuConfig } from './skipMenu';

/* ********************************** */

const addMenuItemEvents = (
  listItem: HTMLDivElement,
  targetElement: HTMLElement,
  config: SkipMenuConfig
) => {
  const buttonId = config.buttonId;
  listItem.addEventListener('click', (event) => {
    closeMenu(config);
    (targetElement as HTMLElement).focus();
    event.stopPropagation();
    event.preventDefault();
  });
  // TODO - move logic to add listeners to a new method
  listItem.addEventListener('keydown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.key === 'Enter' || e.key === ' ') {
      (targetElement as HTMLElement).focus();
      closeMenu(config);
    }
    if (e.key === 'Tab') {
      closeMenu(config);
      if (e.shiftKey) {
        document.getElementById(buttonId).focus();
      } else {
        focusNextElement(buttonId);
      }
    }
  });
  return listItem;
};

// *****************************************************************************

const landMarkType = (element: HTMLElement, config: SkipMenuConfig) => {
  const tag = element.tagName;
  const role = element.getAttribute('role');

  switch (role) {
    case 'main':
      return config.text.mainLabel;
    case 'search':
      return config.text.searchLabel;
    case 'navigation':
      return config.text.navigationLabel;
    case 'region':
      return config.text.regionLabel;
    case 'complementary':
      return config.text.complementaryLabel;
    case 'banner':
      return config.text.bannerLabel;
    case 'contentinfo':
      return config.text.footerLabel;
  }
  switch (tag.toLowerCase()) {
    case 'main':
      return config.text.mainLabel;
    case 'nav':
      return config.text.navigationLabel;
    case 'section':
      return config.text.sectionLabel;
    case 'form':
      return config.text.formLabel;
    case 'aside':
      return config.text.complementaryLabel;
    case 'header':
      return config.text.bannerLabel;
    case 'footer':
      return config.text.footerLabel;
  }
  return null;
};

const getMenuItemText = (
  element: HTMLElement,
  isHeader: boolean,
  config: SkipMenuConfig
) => {
  const landmark = landMarkType(element, config);
  let text = '';
  if (element.hasAttribute('aria-label')) {
    text = element.getAttribute('aria-label');
  } else if (element.hasAttribute('aria-labelledby')) {
    text = document
      .getElementById(element.getAttribute('aria-labelledby'))
      .innerText.trim();
  } else if (element.hasAttribute('title')) {
    text = element.getAttribute('title');
  }

  if (landmark) {
    return text ? `${landmark}: ${text}` : landmark;
  } else if (isHeader) {
    const headerText = text || element.innerText;
    return headerText.trim();
  } else {
    // unsure what this is, return tagname
    return element.tagName.toLocaleLowerCase();
  }
};

// *****************************************************************************

const buildMenuItem = (
  element: HTMLElement,
  depth: number,
  config: SkipMenuConfig
) => {
  let listItem = document.createElement('div');
  let listItemText = getMenuItemText(element, !!depth, config);

  if (!listItemText || listItemText === '') {
    return null;
  }

  if (depth) {
    listItem.className = `${config.id}-menu-header-level-${depth}`;
    listItemText = `${depth}) ${listItemText}`;
  }

  const text = document.createTextNode(listItemText);
  listItem.appendChild(text);
  listItem.setAttribute('role', 'menuitem');
  listItem.classList.add('dropdown-item');
  listItem.setAttribute('tabindex', '-1');

  listItem = addMenuItemEvents(listItem, element, config);
  return listItem;
};

/* ********************************** */

export const buildMenuSection = (
  elements: NodeListOf<Element>,
  sectionTitle: string,
  sectionId: string,
  config: SkipMenuConfig
) => {
  if (elements.length === 0) {
    return null;
  }
  const container = document.createElement('div');
  container.setAttribute('role', 'group');
  container.id = sectionId;
  const containerTitle = document.createElement('div');
  containerTitle.setAttribute('role', 'separator');
  containerTitle.appendChild(document.createTextNode(sectionTitle));
  container.appendChild(containerTitle);

  elements.forEach((element) => {
    if (isVisible(element as HTMLElement)) {
      let depth = parseInt(element.tagName.substring(1));
      if (element.getAttribute('aria-level')) {
        depth = parseInt(element.getAttribute('aria-level'));
      }

      if (!isFocusable(element as HTMLElement)) {
        (element as HTMLElement).tabIndex = -1;
      }
      const menuItem = buildMenuItem(element as HTMLElement, depth, config);
      if (menuItem) {
        container.appendChild(
          buildMenuItem(element as HTMLElement, depth, config)
        );
      }
    }
  });
  return container;
};
