import { SkipMenuConfig } from './skipMenu';
import { closeMenu } from './button';

export const addCloseMenuOnClick = (config: SkipMenuConfig) => {
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
  config: SkipMenuConfig,
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
          mutation.attributeName !== 'tabindex' &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          mutation.addedNodes[0]?.data !== '\n\n'
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
