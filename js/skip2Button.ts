import { Skip2Config } from "./skip2";

export const toggleMenu = (
  config: Skip2Config,
  forceClose: boolean = false,
  keepVisibleOnClose: boolean = false
) => {
  const menu = document.getElementById(config.menuId);
  const button = document.getElementById(config.buttonId);
  const isCurrentlyExpanded = button.getAttribute("aria-expanded");
  if (forceClose || isCurrentlyExpanded === "true") {
    // hide menu
    button.setAttribute("aria-expanded", "false");
    menu.style.display = "none";
    if (!keepVisibleOnClose && !config.showOnLoad) {
      document.getElementById(config.id).classList.add("skip2Hidden");
    }
  } else {
    // show menu
    menu.querySelectorAll("[role=menuitem");
    button.setAttribute("aria-expanded", "true");
    menu.style.display = "block";
    const firstItem = menu.querySelector('[role="menuitem"]');
    (firstItem as HTMLElement).focus();
  }
};

export const createSkip2Button = (config: Skip2Config) => {
  const skip2Button = document.createElement("button");
  skip2Button.setAttribute("aria-haspopup", "true");
  skip2Button.setAttribute("aria-expanded", "false");
  skip2Button.setAttribute("aria-controls", config.menuId);
  skip2Button.setAttribute("accesskey", "0");
  skip2Button.classList.add("btn", "btn-secondary");
  skip2Button.id = config.buttonId;
  skip2Button.innerHTML = "Skip To Content";
  //btn btn-secondary

  skip2Button.addEventListener("click", () => {
    toggleMenu(config, false, true);
  });
  if (!config.showOnLoad) {
    skip2Button.addEventListener("focus", () => {
      document.getElementById(config.id).classList.remove("skip2Hidden");
    });

    skip2Button.addEventListener("blur", () => {
      if (skip2Button.getAttribute("aria-expanded") === "false") {
        document.getElementById(config.id).classList.add("skip2Hidden");
      }
    });
  }

  return skip2Button;
};
