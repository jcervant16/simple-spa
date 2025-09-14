import { load } from "./style-manager";
import { assert } from "../utils/assert"

let _routes = [];
let route = { path: '', page: '', activeGuard: undefined };
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

async function handleLocation() {
    path = window.location.pathname;
    const route = getRoute(path);
    if (!routerContainer) {
        console.error("Element <router-slot> not found");
        return;
    }

    if (!route && existNotFoundRoute()) {
        loadPage(getNotFoundPage());
        return;
    }

    if (route.activeGuard && typeof route.activeGuard === "function") {
        const activated = await route.activeGuard();
        if (activated) {
            loadPage(route.page);
        }
        return;
    }

    if (route) {
        loadPage(route.page);
    }
}

async function loadPage(page) {
    assert(page);
    assert(typeof page === "string");

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
    assert(urlPath);
    assert(typeof urlPath === "string");

    const response = await fetch(urlPath);
    if (!response.ok) {
        throw new Error('error to get HTML');
    }
    return await response.text();
}

function getRoute(path) {
    if (path !== route.path) {
        route = _routes.find(item => item.path === path)
    }
    return route;
}

function getNotFoundPage() {
    return getRoute('*').page;
}

function existNotFoundRoute() {
    return Boolean(getNotFoundPage());
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
        handleLocation();
    });

    window.addEventListener('pushstate', () => {
        handleLocation();
    });
})()