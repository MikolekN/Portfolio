let menu = document.getElementById("menu");
let offset = menu.offsetTop;
window.onscroll = function () {
  if (window.scrollY >= offset) {
    menu.classList.add("sticky");
  } else {
    menu.classList.remove("sticky");
  }
};
