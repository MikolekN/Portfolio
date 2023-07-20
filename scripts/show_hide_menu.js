var menu = document.getElementById("menu")
var icons = document.getElementsByClassName("fa")
function showMenu() {
    menu.style.right = "0"
}
function hideMenu() {
    menu.style.right = "-150px"
}
window.showMenu = showMenu
window.hideMenu = hideMenu