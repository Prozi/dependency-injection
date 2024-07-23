"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
class BaseInjectionRequest {
    constructor(propertyKey, targetPrototype) {
        if (typeof targetPrototype === "function") {
            throw new Error(`Should pass the prototype for the target '${targetPrototype.name}', not its constructor!`);
        }
        this.targetPrototype = targetPrototype;
        this.propertyKey = propertyKey;
        this.loadingCallback = function (value) {
            this[propertyKey] = value;
        };
    }
    matches(value) {
        throw "Not overriden";
    }
    load(target, value) {
        this.loadingCallback.apply(target.getInstance(), [value.getInstance()]);
    }
    toString() {
        const requestClassName = this.constructor.name;
        const targetClassName = this.targetPrototype.constructor.name;
        return requestClassName + "@" + targetClassName + "." + this.propertyKey;
    }
}
exports.default = BaseInjectionRequest;
//# sourceMappingURL=BaseInjectionRequest.js.map