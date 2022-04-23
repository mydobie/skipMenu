import { Skip2Config } from './skip2';
import { isTouchEnabled } from './utilities';

export const toggleMenu = (config: Skip2Config, keepVisibleOnClose = false) => {
  const menu = document.getElementById(config.menuId);
  if (menu) {
    const isCurrentlyExpanded = menu.style.display !== 'none';
    if (isCurrentlyExpanded) {
      closeMenu(config, keepVisibleOnClose);
    } else {
      openMenu(config);
    }
  }
};

export const openMenu = (config: Skip2Config) => {
  const menu = document.getElementById(config.menuId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    button.setAttribute('aria-expanded', 'true');
    menu.style.display = 'block';
    const firstItem = menu.querySelector('[role="menuitem"]');
    (firstItem as HTMLElement).focus();
  }
};

export const closeMenu = (config: Skip2Config, keepVisibleOnClose = false) => {
  const menu = document.getElementById(config.menuId);
  if (menu) {
    const button = document.getElementById(config.buttonId);
    button.setAttribute('aria-expanded', 'false');
    menu.style.display = 'none';
    if (!keepVisibleOnClose && !config.showOnLoad) {
      document.getElementById(config.id).classList.add('skip2-hidden');
    }
  }
};

const toolTipText = (accessKey: string): string => {
  if (isTouchEnabled()) {
    return null;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey
  const isMac = /(macintosh|macintel|macppc|mac68k|macos)/.test(userAgent);
  const isOpera = /(opera|opr)/.test(userAgent);
  const fireFox = /(firefox)/.test(userAgent);

  let text = 'Shortcut: ';
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

const toolTip = (config: Skip2Config): HTMLElement | null => {
  const toolTipTextString = toolTipText(config.accessKey);
  if (!toolTipTextString) {
    return null;
  }
  const tooltip = document.createElement('div');
  tooltip.id = config.tooltipId;
  tooltip.classList.add('tooltip', 'bs-tooltip-bottom');
  const tooltipArrow = document.createElement('div');
  tooltipArrow.classList.add('tooltip-arrow');
  tooltip.appendChild(tooltipArrow);
  const tooltipInner = document.createElement('div');
  tooltipInner.classList.add('tooltip-inner');
  tooltipInner.textContent = toolTipText(config.accessKey);
  tooltip.appendChild(tooltipInner);
  return tooltip;
};

export const createSkip2Button = (config: Skip2Config) => {
  const buttonWrapper = document.createDocumentFragment();
  const skip2Button = document.createElement('button');
  skip2Button.setAttribute('aria-haspopup', 'true');
  skip2Button.setAttribute('aria-expanded', 'false');
  skip2Button.setAttribute('aria-controls', config.menuId);
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

  buttonWrapper.appendChild(skip2Button);

  if (config.addAccessKey) {
    const skip2ToolTip = toolTip(config);
    if (skip2ToolTip) {
      skip2Button.addEventListener('focus', () => {
        skip2ToolTip.style.opacity = '1';
      });
      skip2Button.addEventListener('blur', () => {
        skip2ToolTip.style.opacity = '0';
      });

      buttonWrapper.appendChild(skip2ToolTip);
      skip2Button.setAttribute('accesskey', config.accessKey);
    }
  }
  return buttonWrapper;
};

/* ************************************************** */
