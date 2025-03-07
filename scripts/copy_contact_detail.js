document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#contactDetails li:not(:has(a))").forEach(item => {
        item.addEventListener("click", () => {
            const textToCopy = item.querySelector("h2").innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert(`Copied: ${textToCopy}`);
            }).catch(err => {
                console.error("Failed to copy:", err);
            });
        });
    });
});
