"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Injectable {
    constructor(classConstructor) {
        this.factory = classConstructor;
    }
    get() {
        if (!this.instance) {
            this.instance = new this.factory();
        }
        return this.instance;
    }
    static addInjectable(factory) {
        if (Injectable.classes.indexOf(factory) === -1) {
            Injectable.classes.push(new Injectable(factory));
        }
    }
    static getInjectable(factory) {
        const matching = Injectable.classes.filter((currentInjectable) => currentInjectable.factory === factory);
        if (matching.length === 0) {
            throw new Error("No such singleton");
        }
        if (matching.length > 1) {
            throw new Error("Same singleton was declared twice");
        }
        return matching[0];
    }
}
Injectable.classes = [];
exports.default = Injectable;
//# sourceMappingURL=Injectable.js.map