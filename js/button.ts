import { SkipMenuConfigFull } from './skipMenu';
import { isTouchEnabled } from './utilities';

export const openMenu = (config: SkipMenuConfigFull, lastItem = false) => {
  const menu = document.getElementById(config.menuContainerId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    menu.style.display = 'block';
    button?.setAttribute('aria-expanded', 'true');

    const items = menu.querySelectorAll('[role="menuitem"]');
    if (lastItem) {
      (items[items.length - 1] as HTMLElement).focus();
    } else {
      (items[0] as HTMLElement).focus();
    }
  }
};

export const closeMenu = (
  config: SkipMenuConfigFull,
  keepVisibleOnClose = false
) => {
  const menu = document.getElementById(config.menuContainerId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    button?.removeAttribute('aria-expanded');
    menu.style.display = 'none';
    if (!keepVisibleOnClose && !config.alwaysShow) {
      document.getElementById(config.id)?.classList.add('skipMenu-hidden');
    }
    button?.focus();
  }
};

export const toggleMenu = (
  config: SkipMenuConfigFull,
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

const toolTipText = (accessKey: string, startText: string): string | null => {
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

const toolTip = (config: SkipMenuConfigFull): HTMLElement | null => {
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

export const createskipMenuButton = (config: SkipMenuConfigFull) => {
  const buttonWrapper = document.createDocumentFragment();
  const skipMenuButton = document.createElement('button');
  skipMenuButton.setAttribute('aria-haspopup', 'true');

  skipMenuButton.removeAttribute('aria-expanded');
  skipMenuButton.setAttribute('aria-controls', config.menuContainerId);
  skipMenuButton.classList.add(
    'btn',
    'btn-secondary',
    'dropdown-toggle',
    'pf-c-button',
    'pf-m-tertiary'
  );
  skipMenuButton.id = config.buttonId;
  skipMenuButton.textContent = config.text.buttonLabel;

  const pfDropdownArrow = document.createElement('span');
  pfDropdownArrow.classList.add('pf-c-dropdown__toggle-icon');
  skipMenuButton.appendChild(pfDropdownArrow);
  if (config.tabIndex) {
    skipMenuButton.tabIndex = config.tabIndex;
  }

  skipMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleMenu(config, true);
  });

  skipMenuButton.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
      e.stopPropagation();
      e.preventDefault();
      if (e.key == 'ArrowDown') {
        openMenu(config);
      } else {
        openMenu(config, true);
      }
    }
  });

  if (!config.alwaysShow) {
    skipMenuButton.addEventListener('focus', () => {
      document.getElementById(config.id)?.classList.remove('skipMenu-hidden');
    });

    skipMenuButton.addEventListener('blur', () => {
      if (!skipMenuButton.hasAttribute('aria-expanded')) {
        document.getElementById(config.id)?.classList.add('skipMenu-hidden');
      }
    });
  }

  buttonWrapper.appendChild(skipMenuButton);

  if (config.useAccessKey) {
    const skipMenuToolTip = toolTip(config);
    if (skipMenuToolTip) {
      skipMenuButton.addEventListener('focus', () => {
        if (!skipMenuButton.hasAttribute('aria-expanded')) {
          skipMenuToolTip.style.display = 'block';
        }
      });
      skipMenuButton.addEventListener('blur', () => {
        skipMenuToolTip.style.display = 'none';
      });
      skipMenuButton.addEventListener('mouseover', () => {
        if (!skipMenuButton.hasAttribute('aria-expanded')) {
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
