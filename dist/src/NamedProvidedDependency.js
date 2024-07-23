"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProvidedDependency_1 = __importDefault(require("./ProvidedDependency"));
class NamedProvidedDependency extends ProvidedDependency_1.default {
    constructor(instance, name) {
        super(instance);
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
exports.default = NamedProvidedDependency;
//# sourceMappingURL=NamedProvidedDependency.js.map