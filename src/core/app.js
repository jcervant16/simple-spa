import { router } from './router.js';
import { state } from './state.js';

export const app = {
    mount(rootSelector, routes) {
        const root = document.querySelector(rootSelector);
        if (!root) {
            throw new Error(`Elemento root '${rootSelector}' no encontrado.`);
        }

        Object.keys(routes).forEach(path => {
            const Component = routes[path];
            router.addRoute(path, () => {
                const componentInstance = new Component(root, { router, state });
                componentInstance.render();
            });
        });

        router.handleLocation();
    }
};