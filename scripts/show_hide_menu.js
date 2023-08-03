var menu = document.getElementById("header-menu")
function showMenu() {
    menu.style.right = "0"
}
function hideMenu() {
    menu.style.right = "-100px"
}
window.showMenu = showMenu
window.hideMenu = hideMenu