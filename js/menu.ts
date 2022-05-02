import { SkipMenuConfig } from './skipMenu';
import { buildMenuSection } from './menuSection';
import { closeMenu } from './button';

const menuItemsEvent = (
  menu: HTMLElement,
  config: SkipMenuConfig
): HTMLElement => {
  // const menu = document
  const menuItems = menu.querySelectorAll('[role="menuitem"]');
  menuItems.forEach((item, index) => {
    (item as HTMLElement).tabIndex = -1;
    item.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
        e.stopPropagation();
        e.preventDefault();
        if (e.key === 'ArrowDown') {
          if (menuItems[index + 1]) {
            (menuItems[index + 1] as HTMLElement).focus();
          } else {
            (menuItems[0] as HTMLElement).focus();
          }
        }
        if (e.key === 'ArrowUp') {
          if (menuItems[index - 1]) {
            (menuItems[index - 1] as HTMLElement).focus();
          } else {
            (menuItems[menuItems.length - 1] as HTMLElement).focus();
          }
        }
      }
      if (e.key === 'Escape') {
        closeMenu(config);
      }
    });
  });
  return menu;
};

export const buildMenu = (config: SkipMenuConfig): DocumentFragment => {
  // build the actual menu
  const menuWrapper = document.createDocumentFragment(); // This probably isn't needed
  const menu = document.createElement('div');
  menu.setAttribute('role', 'menu');
  menu.classList.add('dropdown-menu');
  menu.style.display = 'none';
  menu.id = config.menuId;

  // attach the sections
  const headerSection = buildMenuSection(
    document.querySelectorAll(config.headers),
    config.text.headingsLabel,
    `${config.id}_headings`,
    config
  );
  const landmarkSection = buildMenuSection(
    document.querySelectorAll(config.landmarks),
    config.text.landmarksLabel,
    `${config.id}_landmarks`,
    config
  );

  if (landmarkSection !== null) {
    menu.appendChild(landmarkSection);
  }

  if (headerSection !== null) {
    menu.appendChild(headerSection);
  }

  menuWrapper.appendChild(menu);

  // attach the events
  if (headerSection !== null || landmarkSection !== null) {
    menuItemsEvent(menu, config);
    return menuWrapper;
  }
  return null;
};
