import { Skip2Config } from './skip2';
import { buildMenuSection } from './menuSection';

const menuItemsEvent = (menu: HTMLElement): HTMLElement => {
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
    });
  });
  return menu;
};

export const buildMenu = (config: Skip2Config): DocumentFragment => {
  // build the actual menu
  const menuWrapper = document.createDocumentFragment();
  const menu = document.createElement('div');
  menu.setAttribute('role', 'menu');
  menu.classList.add('dropdown-menu');
  menu.id = config.menuId;

  // attach the sections
  const headerSection = buildMenuSection(
    document.querySelectorAll(config.headers),
    'Headings',
    config
  );
  const landmarkSection = buildMenuSection(
    document.querySelectorAll(config.landmarks),
    'Landmarks',
    config
  );

  menu.appendChild(landmarkSection);
  menu.appendChild(headerSection);

  menuWrapper.appendChild(menu);
  // attach the events
  menuItemsEvent(menu);

  return menuWrapper;
};
