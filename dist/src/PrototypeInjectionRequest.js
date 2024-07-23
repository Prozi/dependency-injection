"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInjectionRequest_1 = __importDefault(require("./BaseInjectionRequest"));
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
class PrototypeInjectionRequest extends BaseInjectionRequest_1.default {
    constructor(propertyKey, targetPrototype, valuePrototype) {
        if (typeof valuePrototype === "function") {
            throw new Error("Should pass the prototype for the value '" +
                valuePrototype.name +
                "', not its constructor!");
        }
        super(propertyKey, targetPrototype);
        this.valuePrototype = valuePrototype;
    }
    matches(value) {
        return this.valuePrototype.isPrototypeOf(value.getInstance());
    }
}
exports.default = PrototypeInjectionRequest;
//# sourceMappingURL=PrototypeInjectionRequest.js.map