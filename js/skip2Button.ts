import { Skip2Config } from './skip2';

// export const toggleMenu = (
//   config: Skip2Config,
//   forceClose = false,
//   keepVisibleOnClose = false
// ) => {
//   const menu = document.getElementById(config.menuId);

//   const button = document.getElementById(config.buttonId);
//   const isCurrentlyExpanded = button.getAttribute('aria-expanded');
//   if (forceClose || isCurrentlyExpanded === 'true') {
//     // hide menu
//     button.setAttribute('aria-expanded', 'false');
//     menu.style.display = 'none';
//     if (!keepVisibleOnClose && !config.showOnLoad) {
//       document.getElementById(config.id).classList.add('skip2-hidden');
//     }
//   } else {
//     // show menu
//     button.setAttribute('aria-expanded', 'true');
//     menu.style.display = 'block';
//     const firstItem = menu.querySelector('[role="menuitem"]');
//     (firstItem as HTMLElement).focus();
//   }
// };

export const toggleMenu = (config: Skip2Config, keepVisibleOnClose = false) => {
  const menu = document.getElementById(config.menuId);
  const isCurrentlyExpanded = menu.style.display !== 'none';
  if (isCurrentlyExpanded) {
    closeMenu(config, keepVisibleOnClose);
  } else {
    openMenu(config);
  }
};

export const openMenu = (config: Skip2Config) => {
  const menu = document.getElementById(config.menuId);
  const button = document.getElementById(config.buttonId);
  button.setAttribute('aria-expanded', 'true');
  menu.style.display = 'block';
  const firstItem = menu.querySelector('[role="menuitem"]');
  (firstItem as HTMLElement).focus();
};

export const closeMenu = (config: Skip2Config, keepVisibleOnClose = false) => {
  const menu = document.getElementById(config.menuId);
  const button = document.getElementById(config.buttonId);
  button.setAttribute('aria-expanded', 'false');
  menu.style.display = 'none';
  if (!keepVisibleOnClose && !config.showOnLoad) {
    document.getElementById(config.id).classList.add('skip2-hidden');
  }
};

export const createSkip2Button = (config: Skip2Config) => {
  const buttonWrapper = document.createDocumentFragment();
  const skip2Button = document.createElement('button');
  skip2Button.setAttribute('aria-haspopup', 'true');
  skip2Button.setAttribute('aria-expanded', 'false');
  skip2Button.setAttribute('aria-controls', config.menuId);
  // skip2Button.setAttribute('accesskey', '0');
  skip2Button.classList.add('btn', 'btn-secondary');
  skip2Button.id = config.buttonId;
  skip2Button.textContent = 'Skip To Content';

  skip2Button.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMenu(config, true);
  });
  if (!config.showOnLoad) {
    skip2Button.addEventListener('focus', () => {
      document.getElementById(config.id).classList.remove('skip2-hidden');
    });

    skip2Button.addEventListener('blur', () => {
      if (skip2Button.getAttribute('aria-expanded') === 'false') {
        document.getElementById(config.id).classList.add('skip2-hidden');
      }
    });
  }

  const toolTip = document.createElement('div');
  toolTip.textContent = 'AccessKey info';
  buttonWrapper.appendChild(skip2Button);
  buttonWrapper.appendChild(toolTip);

  return buttonWrapper;
};
