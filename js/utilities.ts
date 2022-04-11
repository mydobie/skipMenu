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

export const isInMenu = (el: HTMLElement, menuID = "skip2"): boolean => {
  if (el.nodeType === 9) return false; // is at document level
  if (el.parentElement === null) return false;
  if (el.parentElement.id === menuID) return true;
  return isInMenu(el.parentElement as HTMLElement);
};

export const headers = document.querySelectorAll(
  "h1, h2, h3, h4, h5, h6, [role=heading]"
);

export const focusNextElement = (
  menuButtonId: string = "skip2_button"
): void => {
  // TODO Need to filter out any thing that is not visible
  const canHaveFocus =
    'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

  const focusableElements = document.querySelectorAll(canHaveFocus);
  const index = Array.from(focusableElements).findIndex((el) => {
    return el.isEqualNode(document.getElementById(menuButtonId));
  });
  if (focusableElements[index + 1])
    (focusableElements[index + 1] as HTMLElement).focus();
  else document.getElementById(menuButtonId).focus();
};
