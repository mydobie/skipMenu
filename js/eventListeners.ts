import { Skip2Config } from './skip2';
import { closeMenu } from './skip2Button';

export const addCloseMenuOnClick = (config: Skip2Config) => {
  document.addEventListener('click', (e) => {
    const menu = document.getElementById(config.menuId);
    if (menu) {
      const isMenuOpen = menu.style.display !== 'none';
      if (isMenuOpen && !(e.target as HTMLElement).closest(`#${config.id}`)) {
        closeMenu(config);
      }
    }
  });
};

export const addDomChangeListener = (
  config: Skip2Config,
  update: () => void
) => {
  if (config.reloadOnChange) {
    const obv = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          !Array.from(mutation.removedNodes).some(
            (removedNode) => (removedNode as HTMLElement).id === config.id
          ) &&
          !Array.from(mutation.addedNodes).some(
            (addedNode) => (addedNode as HTMLElement).id === config.id
          ) &&
          !(mutation.target as HTMLElement).closest(`#${config.id}`) &&
          mutation.attributeName !== 'tabindex'
        ) {
          update();
        }
      });
    });
    obv.observe(document, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  }
};
