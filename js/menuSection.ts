import { isElementVisible, focusNextElement, isFocusable } from './utilities';
import { closeMenu } from './button';
import { SkipMenuConfigFull } from './skipMenu';

/* ********************************** */

const addMenuItemEvents = (
  listItem: HTMLDivElement,
  targetElement: HTMLElement,
  config: SkipMenuConfigFull
) => {
  const buttonId = config.buttonId;
  listItem.addEventListener('click', (event) => {
    closeMenu(config);
    (targetElement as HTMLElement).focus();
    event.stopPropagation();
    event.preventDefault();
  });

  listItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      closeMenu(config);
      (targetElement as HTMLElement).focus();
    }
    e.stopPropagation();
    e.preventDefault();
    if (e.key === 'Tab') {
      closeMenu(config);
      if (e.shiftKey) {
        document.getElementById(buttonId)?.focus();
      } else {
        focusNextElement(buttonId);
      }
    }
  });
  return listItem;
};

// *****************************************************************************

const landMarkType = (element: HTMLElement, config: SkipMenuConfigFull) => {
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
  config: SkipMenuConfigFull
) => {
  const landmark = landMarkType(element, config);
  let text: string | null = '';
  if (element.hasAttribute('aria-label')) {
    text = element.getAttribute('aria-label');
  } else if (element.hasAttribute('aria-labelledby')) {
    const elementId = element.getAttribute('aria-labelledby') || '';
    text = document.getElementById(elementId)?.innerText.trim() || '';
  } else if (element.hasAttribute('title')) {
    text = element.getAttribute('title');
  }

  if (landmark) {
    return text ? `${landmark}: ${text}` : landmark;
  } else if (isHeader) {
    const headerText = text || element.innerText;
    return headerText?.trim();
  } else {
    // unsure what this is, return tagname
    return element.tagName.toLocaleLowerCase();
  }
};

// *****************************************************************************

const buildMenuItem = (
  element: HTMLElement,
  depth: number,
  config: SkipMenuConfigFull
) => {
  let listItem = document.createElement('div');
  const listItemText = getMenuItemText(element, !!depth, config);

  if (
    !listItemText ||
    listItemText === '' ||
    element.classList.contains(config.ignoreClass)
  ) {
    return null;
  }

  const span = document.createElement('span');
  span.classList.add('pf-c-menu__item');

  if (depth) {
    listItem.className = `skipMenu-menu-header-level-${depth}`;
    const depthWrapper = document.createElement('span');
    depthWrapper.classList.add('menu__item-depth');

    const depthText = document.createTextNode(`${depth}`);
    depthWrapper.appendChild(depthText);
    span.appendChild(depthWrapper);
    span.appendChild(document.createTextNode(') '));
  }

  const text = document.createTextNode(listItemText);
  const textWrapper = document.createElement('span');
  textWrapper.classList.add('menu__item-text');
  textWrapper.appendChild(text);

  span.appendChild(textWrapper);
  listItem.appendChild(span);
  listItem.setAttribute('role', 'menuitem');
  listItem.classList.add('dropdown-item', 'pf-c-menu__list-item');
  listItem.setAttribute('tabindex', '-1');

  listItem = addMenuItemEvents(listItem, element, config);

  return listItem;
};

/* ********************************** */

export const buildMenuSection = (
  elements: NodeListOf<Element>,
  sectionTitle: string,
  sectionId: string,
  config: SkipMenuConfigFull
) => {
  if (elements.length === 0) {
    return null;
  }
  const container = document.createElement('div');
  container.setAttribute('role', 'group');
  container.classList.add('pf-c-menu__list');
  container.id = sectionId;
  container.setAttribute('aria-labelledby', `${sectionId}-title`);
  const containerTitle = document.createElement('div');
  containerTitle.setAttribute('role', 'separator');
  containerTitle.id = `${sectionId}-title`;
  containerTitle.appendChild(document.createTextNode(sectionTitle));
  container.appendChild(containerTitle);

  elements.forEach((element) => {
    if (isElementVisible(element as HTMLElement)) {
      let depth = parseInt(element.tagName.substring(1));
      if (element.getAttribute('aria-level')) {
        depth = parseInt(element.getAttribute('aria-level') || '');
      }

      if (!isFocusable(element as HTMLElement)) {
        (element as HTMLElement).tabIndex = -1;
      }
      const menuItem = buildMenuItem(element as HTMLElement, depth, config);
      if (menuItem) {
        container.appendChild(menuItem);
      }
    }
  });
  return container;
};
