"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInjectionRequest_1 = __importDefault(require("./BaseInjectionRequest"));
const NamedProvidedDependency_1 = __importDefault(require("./NamedProvidedDependency"));
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
class NamedInjectionRequest extends BaseInjectionRequest_1.default {
    constructor(propertyKey, targetPrototype, name, valuePrototype) {
        if (valuePrototype && typeof valuePrototype === "function") {
            throw new Error("Should pass the prototype for the value '" +
                valuePrototype.name +
                "', not its constructor!");
        }
        super(propertyKey, targetPrototype);
        this.valueName = name;
        this.valuePrototype = valuePrototype;
    }
    matches(value) {
        if (!(value instanceof NamedProvidedDependency_1.default)) {
            return false;
        }
        const namedDep = value;
        const nameMatch = this.valueName === namedDep.getName();
        const prototypeMatch = this.valuePrototype
            ? this.valuePrototype.isPrototypeOf(value.getInstance())
            : true;
        return nameMatch && prototypeMatch;
    }
    toString() {
        let suffix = "";
        if (this.valuePrototype) {
            suffix += this.valuePrototype.constructor.name + "@";
        }
        suffix += this.valueName;
        return super.toString() + "=" + suffix;
    }
}
exports.default = NamedInjectionRequest;
//# sourceMappingURL=NamedInjectionRequest.js.map