import { assert } from "../utils/assert"
let loadedStyles = new Map();


export function load(href) {
    if (loadedStyles.has(href)) {

        const link = loadedStyles.get(href);
        if (link.getAttribute("href") !== href) {
            link.setAttribute("href", href);
        }
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    document.head.appendChild(link);
    loadedStyles.set(href, link);
}

function unload(href) {
    if (loadedStyles.has(href)) {
        const link = loadedStyles.get(href);
        link.remove();
        loadedStyles.delete(href);
    }

}

export function proccesLinkTags(routerContainer) {
    assert(routerContainer);

    const linksElements = routerContainer.querySelectorAll("link");
    linksElements.forEach(link => {
        load(link.getAttribute("href"));
        link.remove();
    });
}
