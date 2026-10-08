// Mikołaj Nadzieja, portfolio. Plain JavaScript, no dependencies.

(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Menu button on small screens
    var menuButton = document.querySelector(".menu-button");
    var nav = document.getElementById("site-nav");

    if (menuButton && nav) {
        var setMenu = function (open) {
            nav.classList.toggle("is-open", open);
            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.textContent = open ? "Close" : "Menu";
        };

        menuButton.addEventListener("click", function () {
            setMenu(!nav.classList.contains("is-open"));
        });

        nav.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                setMenu(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && nav.classList.contains("is-open")) {
                setMenu(false);
                menuButton.focus();
            }
        });
    }

    // Statute-to-XML demo: pointing at, tapping or arrowing to a provision highlights it and its XML element.
    // The highlight stays on the last provision chosen; reverting on mouseleave made it flash back to the
    // first paragraph every time the pointer crossed the gap between two lines.
    // The provisions become toggle buttons here, so the page has no dead buttons without JavaScript.
    var demo = document.querySelector("[data-demo]");

    if (demo) {
        var provisions = Array.prototype.slice.call(demo.querySelectorAll(".prov[data-eid]"));
        var targets = demo.querySelectorAll("[data-in]");
        var xmlPane = demo.querySelector(".xml");
        var current = "art_1__para_1";

        var show = function (eid) {
            targets.forEach(function (el) {
                el.classList.toggle("is-on", el.dataset.in.split(" ").indexOf(eid) !== -1);
            });
        };

        // On small screens the XML pane scrolls; bring the highlighted element into view inside it.
        var revealInPane = function () {
            if (!xmlPane || xmlPane.scrollHeight <= xmlPane.clientHeight + 1) {
                return;
            }
            var first = xmlPane.querySelector(".ln.is-on");
            if (first) {
                xmlPane.scrollTo({
                    top: Math.max(0, first.offsetTop - xmlPane.offsetTop - 16),
                    behavior: reduceMotion ? "auto" : "smooth"
                });
            }
        };

        var select = function (prov) {
            if (prov.dataset.eid === current) {
                return;
            }
            current = prov.dataset.eid;
            provisions.forEach(function (p) {
                var on = p === prov;
                p.setAttribute("aria-pressed", String(on));
                p.tabIndex = on ? 0 : -1;
            });
            show(current);
            revealInPane();
        };

        provisions.forEach(function (prov, index) {
            var isCurrent = prov.dataset.eid === current;
            prov.setAttribute("role", "button");
            prov.setAttribute("aria-pressed", String(isCurrent));
            prov.tabIndex = isCurrent ? 0 : -1;

            // A tap fires mouseenter and then click; select() ignores the repeat.
            prov.addEventListener("mouseenter", function () { select(prov); });
            prov.addEventListener("click", function () { select(prov); });

            prov.addEventListener("keydown", function (event) {
                var next = null;
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    select(prov);
                    return;
                }
                if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                    next = provisions[(index + 1) % provisions.length];
                } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                    next = provisions[(index - 1 + provisions.length) % provisions.length];
                } else if (event.key === "Home") {
                    next = provisions[0];
                } else if (event.key === "End") {
                    next = provisions[provisions.length - 1];
                }
                if (next) {
                    event.preventDefault();
                    select(next);
                    next.focus();
                }
            });
        });

        show(current);
    }

    // Copy buttons in the contact section
    var status = document.querySelector("[data-copy-status]");

    document.querySelectorAll(".copy-button[data-copy]").forEach(function (button) {
        var label = button.textContent;

        if (!navigator.clipboard) {
            button.hidden = true;
            return;
        }

        button.addEventListener("click", function () {
            var text = button.dataset.copy;

            navigator.clipboard.writeText(text).then(function () {
                button.textContent = "Copied";
                button.classList.add("is-copied");
                if (status) {
                    status.textContent = "";
                    window.setTimeout(function () {
                        status.textContent = "Copied " + text;
                    }, 50);
                }
                window.setTimeout(function () {
                    button.textContent = label;
                    button.classList.remove("is-copied");
                }, 2000);
            }).catch(function () {
                button.textContent = "Copy failed";
                window.setTimeout(function () {
                    button.textContent = label;
                }, 2000);
            });
        });
    });
})();
