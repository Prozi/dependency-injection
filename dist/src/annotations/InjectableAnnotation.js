"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injectable_1 = __importDefault(require("../Injectable"));
function Injectable(constructor) {
    // Register it in the singleton registry
    Injectable_1.default.addInjectable(constructor);
}
exports.default = Injectable;
//# sourceMappingURL=InjectableAnnotation.js.map