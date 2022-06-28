import { SkipMenuConfig } from './skipMenu';
import { isTouchEnabled } from './utilities';

export const toggleMenu = (
  config: SkipMenuConfig,
  keepVisibleOnClose = false
) => {
  const menu = document.getElementById(config.menuContainerId);
  if (menu) {
    const isCurrentlyExpanded = menu.style.display !== 'none';
    if (isCurrentlyExpanded) {
      closeMenu(config, keepVisibleOnClose);
    } else {
      openMenu(config);
    }
  }
};

export const openMenu = (config: SkipMenuConfig) => {
  const menu = document.getElementById(config.menuContainerId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    menu.style.display = 'block';
    button.setAttribute('aria-expanded', 'true');
    const firstItem = menu.querySelector('[role="menuitem"]');
    (firstItem as HTMLElement).focus();
  }
};

export const closeMenu = (
  config: SkipMenuConfig,
  keepVisibleOnClose = false
) => {
  const menu = document.getElementById(config.menuContainerId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    button.setAttribute('aria-expanded', 'false');
    menu.style.display = 'none';
    if (!keepVisibleOnClose && !config.alwaysShow) {
      document.getElementById(config.id).classList.add('skipMenu-hidden');
    }
    button.focus();
  }
};

const toolTipText = (accessKey: string, startText: string): string => {
  if (isTouchEnabled()) {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
  const isMac = /(macintosh|macintel|macppc|mac68k|macos)/.test(userAgent);
  const isOpera = /(opera|opr)/.test(userAgent);
  const fireFox = /(firefox)/.test(userAgent);

  let text = startText;
  if (isMac && isOpera) {
    text += 'Control + Alt';
  } else if (isMac) {
    text += 'Control + Option';
  } else if (fireFox) {
    text += 'Alt + Shift';
  } else {
    text += 'Alt';
  }

  text += ' + ' + accessKey;

  return text;
};

const toolTip = (config: SkipMenuConfig): HTMLElement | null => {
  const toolTipTextString = toolTipText(
    config.accessKey,
    config.text.tooltipLabel
  );
  if (!toolTipTextString) {
    return null;
  }
  const tooltip = document.createElement('div');
  tooltip.id = config.tooltipId;
  tooltip.classList.add(
    'tooltip',
    'bs-tooltip-bottom',
    'pf-c-tooltip',
    'pf-m-bottom'
  );
  tooltip.setAttribute('role', 'tooltip');
  const tooltipArrow = document.createElement('div');
  tooltipArrow.classList.add('tooltip-arrow', 'pf-c-tooltip__arrow');
  tooltip.appendChild(tooltipArrow);
  const tooltipInner = document.createElement('div');
  tooltipInner.classList.add('tooltip-inner', 'pf-c-tooltip__content');
  tooltipInner.textContent = toolTipText(
    config.accessKey,
    config.text.tooltipLabel
  );
  tooltip.appendChild(tooltipInner);
  return tooltip;
};

export const createskipMenuButton = (config: SkipMenuConfig) => {
  const buttonWrapper = document.createDocumentFragment();
  const skipMenuButton = document.createElement('button');
  skipMenuButton.setAttribute('aria-haspopup', 'true');
  skipMenuButton.setAttribute('aria-expanded', 'false');
  skipMenuButton.setAttribute('aria-controls', config.menuId);
  skipMenuButton.classList.add(
    'btn',
    'btn-secondary',
    'pf-c-button',
    'pf-m-tertiary'
  );
  skipMenuButton.id = config.buttonId;
  skipMenuButton.textContent = config.text.buttonLabel;
  if (config.tabIndex) {
    skipMenuButton.tabIndex = config.tabIndex;
  }

  skipMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMenu(config, true);
  });

  if (!config.alwaysShow) {
    skipMenuButton.addEventListener('focus', () => {
      document.getElementById(config.id).classList.remove('skipMenu-hidden');
    });

    skipMenuButton.addEventListener('blur', () => {
      if (skipMenuButton.getAttribute('aria-expanded') === 'false') {
        document.getElementById(config.id).classList.add('skipMenu-hidden');
      }
    });
  }

  buttonWrapper.appendChild(skipMenuButton);

  if (config.useAccessKey) {
    const skipMenuToolTip = toolTip(config);
    if (skipMenuToolTip) {
      skipMenuButton.addEventListener('focus', () => {
        if (skipMenuButton.getAttribute('aria-expanded') === 'false') {
          skipMenuToolTip.style.display = 'block';
        }
      });
      skipMenuButton.addEventListener('blur', () => {
        skipMenuToolTip.style.display = 'none';
      });
      skipMenuButton.addEventListener('mouseover', () => {
        if (skipMenuButton.getAttribute('aria-expanded') === 'false') {
          skipMenuToolTip.style.display = 'block';
        }
      });
      skipMenuButton.addEventListener('mouseout', () => {
        skipMenuToolTip.style.display = 'none';
      });

      buttonWrapper.appendChild(skipMenuToolTip);
      skipMenuButton.setAttribute('accesskey', config.accessKey);
    }
  }
  return buttonWrapper;
};

/* ************************************************** */
