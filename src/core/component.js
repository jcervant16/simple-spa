export class Component {
    constructor(targetElement, props = {}) {
        this.targetElement = targetElement;
        this.props = props;
        this.state = {};
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    render() {
        throw new Error('El método render() debe ser implementado.');
    }
}