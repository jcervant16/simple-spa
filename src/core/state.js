export const state = new Proxy({
    data: {},
    subscribers: new Set(),
}, {
    set: (target, key, value) => {
        target.data[key] = value;
        target.subscribers.forEach(subscriber => subscriber());
        return true;
    }
});