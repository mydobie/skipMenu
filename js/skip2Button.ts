export const toggleMenu = (
  menuId: string,
  buttonId: string,
  forceClose: boolean = false
) => {
  const menu = document.getElementById(menuId);
  const button = document.getElementById(buttonId);
  const isCurrentlyExpanded = button.getAttribute("aria-expanded");
  if (forceClose || isCurrentlyExpanded === "true") {
    // hide menu
    button.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
  } else {
    // show menu
    menu.querySelectorAll("[role=menuitem");
    button.setAttribute("aria-expanded", "true");
    menu.style.display = "block";
    const firstItem = menu.querySelector('[role="menuitem"]');
    (firstItem as HTMLElement).focus();
  }
};

export const createSkip2Button = (menuId: string) => {
  const skip2Button = document.createElement("button");
  skip2Button.setAttribute("aria-haspopup", "true");
  skip2Button.setAttribute("aria-expanded", "false");
  skip2Button.setAttribute("aria-controls", menuId);
  skip2Button.setAttribute("accesskey", "0");
  skip2Button.id = `${menuId}_button`;
  skip2Button.innerText = "Skip To Content";

  skip2Button.addEventListener("click", () => {
    toggleMenu(`${menuId}_menu`, `${menuId}_button`);
  });
  return skip2Button;
};
