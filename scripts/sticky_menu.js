let menu = document.getElementById("menu");
let offset = menu.offsetTop;
function stickyMenu() {
  if (window.scrollY >= offset) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
};
export {menu, offset, stickyMenu}