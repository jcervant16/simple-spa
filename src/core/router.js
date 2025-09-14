import { load, unload } from "./style-manager";

let _routes = [];
let routerContainer;

document.addEventListener("DOMContentLoaded", () => {
    routerContainer = document.querySelector('router-slot');
});

export function router(routes) {
    _routes = routes;
}

export function navigate(path) {
    history.pushState({}, '', path)
}

function getNotFoundPage() {
    return _routes.find(item => item.path === '*').page;
}

function existNotFoundRoute() {
    return Boolean(getNotFoundPage);
}

function handleLocation() {
    const path = window.location.pathname;
    const route = _routes.find(item => item.path === path);
    if (!routerContainer) {
        console.error("Element <router-slot> not found");
        return;
    }

    if (!route && existNotFoundRoute()) {
        loadPage(getNotFoundPage());
        return;
    }

    if (route) {
        loadPage(route.page);
    }
}

async function loadPage(page) {
    return fetchPage(page).catch(error => {
        console.error('Error loading page:', error);
    }).then(html => {
        routerContainer.innerHTML = html;
        const linksElements = routerContainer.querySelectorAll("link");
        linksElements.forEach(link => {
            load(link.getAttribute("href"));
            link.remove();
        });
    });
}

async function fetchPage(urlPath) {
    const response = await fetch(urlPath);
    if (!response.ok) {
        throw new Error('error to get HTML');
    }
    return await response.text();
}


(function () {
    const originalPushState = history.pushState;

    history.pushState = function () {
        const result = originalPushState.apply(this, arguments);
        const pushStateEvent = new Event('pushstate');
        window.dispatchEvent(pushStateEvent);
        return result;
    };

    window.addEventListener('popstate', () => {
        handleLocation()
    });

    window.addEventListener('pushstate', () => {
        handleLocation()
    });
})()