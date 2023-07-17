let scrollButton = document.getElementById("scrollButton");
function scrollTopButton() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    scrollButton.classList.remove("hidden");
  } else {
    scrollButton.classList.add("hidden");
  }
};
export {scrollTopButton}