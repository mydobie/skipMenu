export const isVisible = (el: HTMLElement): boolean => {
  if (el.nodeType === 9 || el.parentElement === null) return true; // is at document level
  var computedStyle = window.getComputedStyle(el);
  var display = computedStyle.getPropertyValue("display");
  var visibility = computedStyle.getPropertyValue("visibility");
  var hidden = el.getAttribute("hidden");
  if (display === "none" || visibility === "hidden" || hidden !== null) {
    return false;
  }
  return isVisible(el.parentNode as HTMLElement);
};

// export const isInMenu = (el: HTMLElement, menuID = "skip2"): boolean => {
//   if (el.nodeType === 9) return false; // is at document level
//   if (el.parentElement === null) return false;
//   if (el.parentElement.id === menuID) return true;
//   return isInMenu(el.parentElement as HTMLElement);
// };

export const focusNextElement = (
  menuButtonId: string = "skip2_button"
): void => {
  const canHaveFocus =
    'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

  const focusableElements = document.querySelectorAll(canHaveFocus);
  const index = Array.from(focusableElements).findIndex((el) => {
    return el.isEqualNode(document.getElementById(menuButtonId));
  });

  let next = index + 1;
  while (
    next < focusableElements.length &&
    !isVisible(focusableElements[next] as HTMLElement)
  ) {
    next = next + 1;
  }

  if (focusableElements[next]) (focusableElements[next] as HTMLElement).focus();
  else document.getElementById(menuButtonId).focus();
};
