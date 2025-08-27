class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', () => this.handleLocation());
    }

    addRoute(path, component) {
        this.routes[path] = component;
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleLocation();
    }

    handleLocation() {
        console.log("handle")
        const path = window.location.pathname;
        const component = this.routes[path] || this.routes['/'];
        if (component) {
            component();
        }
    }
}

export const router = new Router();