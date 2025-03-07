let menu = document.getElementById("main-menu-wrapper")
let menu_placeholder = document.getElementById("main-menu-placeholder")
let e = document.querySelectorAll("section")
let offset = menu.offsetTop
let height = menu.offsetHeight
function stickyMenu() {
  if (window.scrollY >= offset) {
    menu.style.position = "fixed"
    menu.style.top = '0'
    menu_placeholder.style.height = menu.offsetHeight + 'px'
  } else {
    menu.style.position = 'static'
    menu_placeholder.style.height = menu.offsetHeight + 'px'
  }
};
window.addEventListener('scroll', stickyMenu)
