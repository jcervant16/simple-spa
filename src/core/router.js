import { proccesLinkTags } from "./style-manager";
import { assert } from "../utils/assert"

let _routes = [];
let _route = { path: '', page: '', activeGuard: undefined };
let _previousRoute = { path: '', page: '', activeGuard: undefined };
let _routerContainer;

document.addEventListener("DOMContentLoaded", () => {
    _routerContainer = document.querySelector('router-slot');
});

export function router(routes) {
    _routes = routes;
}

export function navigate(path) {
    history.pushState({}, '', path)
}

async function handleLocation() {
    const path = window.location.pathname;
    const route = getRoute(path);

    if (!route && existNotFoundRoute()) {
        loadPage(getNotFoundPage());
        return;
    }

    if (route.activeGuard && !await route.activeGuard()) {
        return;
    }

    if (_previousRoute.path !== path) {
        loadPage(route.page);
        _previousRoute = route;
    }
}

async function loadPage(page) {
    assert(typeof page === "string");
    assert(_routerContainer);

    return fetchPage(page).catch(error => {
        console.error('Error loading page:', error);
    }).then(html => {
        _routerContainer.innerHTML = html;
        proccesLinkTags(_routerContainer);
    });
}

async function fetchPage(urlPath) {
    assert(typeof urlPath === "string");

    const response = await fetch(urlPath);
    if (!response.ok) {
        throw new Error('error to get HTML');
    }
    return await response.text();
}

function getRoute(path) {
    if (path !== _route.path) {
        _route = _routes.find(item => item.path === path)
    }
    return _route;
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