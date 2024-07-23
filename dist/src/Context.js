"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Injector_1 = __importDefault(require("./Injector"));
const NamedProvidedDependency_1 = __importDefault(require("./NamedProvidedDependency"));
const PrototypeProvidedDependency_1 = __importDefault(require("./PrototypeProvidedDependency"));
/**
 * Data class to hold the link between request and instance
 */
class InjectionRequestInstance {
    constructor(request, instance) {
        this.request = request;
        this.instance = instance;
    }
}
class DependencyInjectionContext {
    constructor() {
        this.providedDependencies = [];
        this.injector = new Injector_1.default();
    }
    loadRequests(dep) {
        const self = this;
        Injector_1.default.getRequests(dep).map(function (r) {
            self.requests.push(new InjectionRequestInstance(r, dep));
        });
    }
    addValue(instance, name) {
        if (name) {
            // logger.debug("Adding named dep: {}", name);
            this.addNamedValue(instance, name);
            //this.providedDependencies.push(new NamedProvidedDependency(instance, name));
        }
        else {
            this.providedDependencies.push(new PrototypeProvidedDependency_1.default(instance));
        }
    }
    addNamedValue(instance, name) {
        // Store the dependency
        this.providedDependencies.push(new NamedProvidedDependency_1.default(instance, name));
    }
    resolve(strict = false) {
        // Build the request list
        this.requests = [];
        for (const i in this.providedDependencies) {
            if (!this.providedDependencies.hasOwnProperty(i))
                continue;
            const dep = this.providedDependencies[i];
            this.loadRequests(dep);
        }
        // Resolve the requests
        for (const i in this.requests) {
            if (!this.requests.hasOwnProperty(i))
                continue;
            const r = this.requests[i];
            this.injector.resolveRequest(r.request, r.instance, this.providedDependencies, strict);
        }
    }
    resolveStrict() {
        this.resolve(true);
    }
}
exports.default = DependencyInjectionContext;
//# sourceMappingURL=Context.js.map