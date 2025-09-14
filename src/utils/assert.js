export function assert(predicate, message = '') {
    if (!predicate) {
        throw new Error('Assert Error', message)
    }
}