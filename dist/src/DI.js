"use strict";
/**
 * Created by Tom on 02/07/2015.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.Injectable = exports.Dependency = exports.Context = void 0;
__exportStar(require("./annotations/Inject"), exports);
const Dependency_1 = __importDefault(require("./annotations/Dependency"));
exports.Dependency = Dependency_1.default;
const InjectableAnnotation_1 = __importDefault(require("./annotations/InjectableAnnotation"));
exports.Injectable = InjectableAnnotation_1.default;
const Config_1 = __importDefault(require("./Config"));
exports.Config = Config_1.default;
const Context_1 = __importDefault(require("./Context"));
exports.Context = Context_1.default;
//# sourceMappingURL=DI.js.map