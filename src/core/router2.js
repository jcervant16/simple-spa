let _routes = {};

export function router(routes) {
    _routes = routes;
}

export function navigate(path) {
    history.pushState({}, '', path)
}

function handleLocation() {
    const path = window.location.pathname;
    console.log(path)
    const pageUrl = _routes[path] || _routes['/'];
    if (pageUrl) {
        fetchPage(pageUrl).then(html => {
            const contenedor = document.getElementById('router-container');
            if (contenedor) {
                contenedor.innerHTML = html;
            }
        })
            .catch(error => {
                console.error('Error al cargar el archivo:', error);
            });
    }
}

async function fetchPage(urlPath) {
    const response = await fetch(urlPath);
    if (!response.ok) {
        throw new Error('No se pudo cargar el archivo HTML');
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