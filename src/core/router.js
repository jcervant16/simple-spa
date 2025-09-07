let _routes = [];

export function router(routes) {
    _routes = routes;
}

export function navigate(path) {
    history.pushState({}, '', path)
}

function handleLocation() {
    const path = window.location.pathname;
    const route = _routes.find(item => item.path === path);

    if (route) {
        fetchPage(route.page).then(html => {
            const routerContainer = document.getElementById('router-container');
            if (routerContainer) {
                routerContainer.innerHTML = html;
            }
        })
            .catch(error => {
                console.error('Error loading page:', error);
            });
    }
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