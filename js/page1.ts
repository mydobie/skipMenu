import { eachYearOfInterval } from "date-fns";
import { getRandomColor } from "./Formatter";
import { createSkip2Button, toggleMenu } from "./skip2Button";
import { isVisible, isInMenu, headers, focusNextElement } from "./utilities";

/* **************************************************** */
/* ***** Set bar color ****** */
document.getElementById("bar").style.backgroundColor = getRandomColor();

/* **************************************************** */

const headerList = document.createElement("div");
headerList.setAttribute("role", "group");
const headerTitle = document.createElement("div");
headerTitle.setAttribute("role", "separator");
headerTitle.appendChild(document.createTextNode("Headers"));
headerList.appendChild(headerTitle);

headers.forEach((header, index) => {
  if (isVisible(header as HTMLElement)) {
    let depth = parseInt(header.tagName.substring(1));
    if (header.getAttribute("aria-level")) {
      depth = parseInt(header.getAttribute("aria-level"));
    }

    (header as HTMLElement).tabIndex = -1;
    const listItem = document.createElement("div");
    listItem.className = `skip2_header-level-${depth}`;

    var text = document.createTextNode(
      `${depth}) ${(header as HTMLElement).innerText}`
    );
    listItem.appendChild(text);
    listItem.setAttribute("role", "menuitem");
    listItem.classList.add("dropdown-item");
    listItem.setAttribute("tabindex", "-1");
    listItem.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      (header as HTMLElement).focus();
      toggleMenu("skip2_menu", "skip2_button", true);
    });
    listItem.addEventListener("keydown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.key === "Enter" || e.key === " ") {
        (header as HTMLElement).focus();
        toggleMenu("skip2_menu", "skip2_button", true);
      }
      if (e.key === "Tab") {
        toggleMenu("skip2_menu", "skip2_button", true);
        // This isn't right - should go to the next element
        //document.getElementById("skip2_button").focus();
        focusNextElement("skip2_button");
        console.log("FOcused element: ", document.activeElement);
      }
    });
    headerList.appendChild(listItem);
  }
});

const menu = document.createElement("div");
menu.setAttribute("role", "menu");
menu.classList.add("skip2_menu");
menu.classList.add("dropdown-menu");
menu.id = "skip2_menu";

menu.appendChild(headerList);

const skip2 = document.createElement("div");
skip2.classList.add("skip2");
skip2.id = "skip2";

const skip2Button = createSkip2Button("skip2_menu");
skip2Button.addEventListener("click", () => {
  toggleMenu("skip2_menu", "skip2_button");
});
skip2.appendChild(skip2Button);

skip2.append(menu);
document.getElementsByTagName("body")[0].prepend(skip2);

var menuitemNodes = document
  .getElementsByClassName("skip2_menu")[0]
  .querySelectorAll("[role=menuitem");

menuitemNodes.forEach((item, index) => {
  item.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.stopPropagation();
        e.preventDefault();
        menuitemNodes.forEach((item) => {
          item.tabIndex = -1;
        });
        if (e.key === "ArrowDown") {
          if (index === menuitemNodes.length - 1) {
            //  menuitemNodes[0].tabIndex = 0;
            menuitemNodes[0].focus();
          } else {
            // menuitemNodes[index + 1].tabIndex = 0;
            menuitemNodes[index + 1].focus();
          }
        }
        if (e.key === "ArrowUp") {
          const menuIndex = index === 0 ? menuitemNodes.length - 1 : index - 1;
          menuitemNodes[menuIndex].focus();
        }
      }
    },
    false
  );
});

// This works but seems like a lot of event listeners
// document.addEventListener("click", (e) => {
//   console.log("Target:", e.target);
//   console.log("In menu:", isInMenu(e.target as HTMLElement));
//   if (!isInMenu(e.target as HTMLElement)) {
//     toggleMenu("skip2_menu", "skip2_button", true);
//   }
// });

// https://github.com/paypal/skipto/blob/main/src/js/skipto.js
// https://stackoverflow.com/questions/7065562/how-do-i-get-all-h1-h2-h3-etc-elements-in-javascript

// if need unique - use     "uuid": "^8.3.2"

/*
TODO:
Escape should close the window and return focus to button
Rebuild on save
Get landmarks
Figure out if we want to attach to the page
  - const foo = new Skip2(config)
  foo.add(); // builds and adds to the page
  foo.remove(); // removes from the page
  foo.update(); // updates the page

*/
