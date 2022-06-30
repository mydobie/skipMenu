import { SkipMenuConfig } from './skipMenu';
import { buildMenuSection } from './menuSection';
import { closeMenu } from './button';

const matchSection = (
  key: string,
  menuItems: NodeListOf<Element>,
  startIndex: number,
  endIndex: number
) => {
  let newIndex: number;
  const firstLetterRegExp = /^([0-9]\) )?([a-zA-Z])/;
  menuItems.forEach((item, i) => {
    const firstLetter = (item as HTMLElement).innerText
      ?.match(firstLetterRegExp)[2]
      ?.toLocaleLowerCase();
    if (
      i >= startIndex &&
      i <= endIndex &&
      !newIndex &&
      firstLetter === key.toLowerCase()
    ) {
      newIndex = i;
    }
  });
  return newIndex;
};

const getMatchingElementIndex = (
  key: string,
  menuItems: NodeListOf<Element>,
  index: number
) => {
  let newIndex: number;
  newIndex = matchSection(key, menuItems, index + 1, menuItems.length - 1);
  if (!newIndex) {
    newIndex = matchSection(key, menuItems, 0, index - 1);
  }
  return newIndex;
};

const menuItemsEvent = (
  menu: HTMLElement,
  config: SkipMenuConfig
): HTMLElement => {
  const menuItems = menu.querySelectorAll('[role="menuitem"]');
  menuItems.forEach((item, index) => {
    (item as HTMLElement).tabIndex = -1;
    item.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.stopImmediatePropagation();
          e.preventDefault();
          if (menuItems[index + 1]) {
            (menuItems[index + 1] as HTMLElement).focus();
          } else {
            (menuItems[0] as HTMLElement).focus();
          }
          break;
        case 'ArrowUp':
          e.stopImmediatePropagation();
          e.preventDefault();
          if (menuItems[index - 1]) {
            (menuItems[index - 1] as HTMLElement).focus();
          } else {
            (menuItems[menuItems.length - 1] as HTMLElement).focus();
          }
          break;
        case 'Escape':
          closeMenu(config);
          break;
        case 'Home':
          (menuItems[0] as HTMLElement).focus();
          break;
        case 'End':
          (menuItems[menuItems.length - 1] as HTMLElement).focus();
          break;
        default:
          if (/^[a-zA-Z]$/.test(e.key)) {
            const newIndex = getMatchingElementIndex(e.key, menuItems, index);
            if (newIndex !== undefined) {
              (menuItems[newIndex] as HTMLElement).focus();
            }
          }
      }
    });
  });
  return menu;
};

export const buildMenu = (config: SkipMenuConfig): HTMLElement => {
  // build the actual menu
  const menu = document.createElement('div');
  menu.setAttribute('aria-live', 'off');
  menu.setAttribute('role', 'menu');
  menu.classList.add('pf-c-menu');
  menu.id = config.menuId;

  // attach the sections
  const headerSection = config.headings
    ? buildMenuSection(
        document.querySelectorAll(config.headings),
        config.text.headingsLabel,
        `${config.id}_headings`,
        config
      )
    : null;
  const landmarkSection = config.landmarks
    ? buildMenuSection(
        document.querySelectorAll(config.landmarks),
        config.text.landmarksLabel,
        `${config.id}_landmarks`,
        config
      )
    : null;

  if (landmarkSection !== null) {
    menu.appendChild(landmarkSection);
  }

  if (headerSection !== null) {
    menu.appendChild(headerSection);
  }

  // attach the events
  if (headerSection !== null || landmarkSection !== null) {
    menuItemsEvent(menu, config);
    return menu;
  }
  return null;
};
