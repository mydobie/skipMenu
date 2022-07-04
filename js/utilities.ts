export const isElementVisible = (el: HTMLElement): boolean => {
  if (el.nodeType === 9 || el.parentElement === null) {
    return true;
  } // is at document level
  const computedStyle = window.getComputedStyle(el);
  const display = computedStyle.getPropertyValue('display');
  const visibility = computedStyle.getPropertyValue('visibility');
  const width = computedStyle.getPropertyValue('width');
  const height = computedStyle.getPropertyValue('height');
  const hidden = el.getAttribute('hidden');

  if (
    display === 'none' ||
    visibility === 'hidden' ||
    hidden !== null ||
    width === '0px' ||
    height === '0px'
  ) {
    return false;
  }

  return isElementVisible(el.parentNode as HTMLElement);
};

export const focusNextElement = (menuButtonId = 'skipMenu_button'): void => {
  const canHaveFocus =
    'a:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

  const focusableElements = document.querySelectorAll(canHaveFocus);
  const buttonIndex = Array.from(focusableElements).findIndex((el) =>
    el.isEqualNode(document.getElementById(menuButtonId))
  );
  const buttonTabIndex = document.getElementById(menuButtonId)?.tabIndex || 0;

  let nextElement;
  if (buttonTabIndex === 0) {
    for (
      let i = buttonIndex + 1;
      i < focusableElements.length && !nextElement;
      i++
    ) {
      if (
        isElementVisible(focusableElements[i] as HTMLElement) &&
        (focusableElements[i] as HTMLElement).tabIndex === 0
      ) {
        nextElement = focusableElements[i];
      }
    }
  } else {
    for (
      let i = buttonIndex + 1;
      i < focusableElements.length && !nextElement;
      i++
    ) {
      if (
        isElementVisible(focusableElements[i] as HTMLElement) &&
        (focusableElements[i] as HTMLElement).tabIndex >= buttonTabIndex
      ) {
        nextElement = focusableElements[i];
      }
    }
    for (let i = 0; i < buttonIndex && !nextElement; i++) {
      if (
        isElementVisible(focusableElements[i] as HTMLElement) &&
        (focusableElements[i] as HTMLElement).tabIndex === 0
      ) {
        nextElement = focusableElements[i];
      }
    }
  }

  if (nextElement) {
    (nextElement as HTMLElement).focus();
  } else {
    document.getElementById(menuButtonId)?.focus();
  }
};

export const isTouchEnabled = () =>
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  navigator.msMaxTouchPoints > 0;

export const isFocusable = (element: HTMLElement): boolean => {
  if (
    element.getAttribute('href') !== null ||
    (element.hasAttribute('contentEditable') &&
      element.getAttribute('contentEditable')?.toLowerCase() !== 'false') ||
    element.getAttribute('tabindex') !== null
  ) {
    return true;
  }

  const tag = element.tagName.toLowerCase();
  return ['button', 'details', 'input', 'iframe', 'select', 'textarea'].some(
    (t) => t === tag
  );
};
