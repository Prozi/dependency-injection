"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class DependencyInjector {
    static getRequests(target) {
        const instance = target.getInstance();
        if (typeof instance !== "object")
            return [];
        const prototype = Object.getPrototypeOf(instance);
        const requests = Reflect.getMetadata(DependencyInjector.DEP_INJ_REQUESTS_KEY, prototype);
        return requests || [];
    }
    resolveRequest(request, providedInstance, deps, strict) {
        const matchingDI = [];
        for (const prop in deps) {
            if (!deps.hasOwnProperty(prop))
                continue;
            const dep = deps[prop];
            // Skip self-injection
            if (dep.getInstance() === providedInstance.getInstance())
                continue;
            // Check if the dependency matches the request
            if (request.matches(dep)) {
                matchingDI.push(dep);
            }
        }
        // Throw an error if more than one dependency matches the request, as the context is ambiguous.
        if (matchingDI.length > 1) {
            throw new Error(`Ambiguous context with ${matchingDI.length} matching dependencies.`);
        }
        // Throw an error or warn if no provided dependency fulfills the request
        if (matchingDI.length === 0) {
            const message = `${request.toString()} was not resolved.`;
            if (strict) {
                throw new Error(message);
            }
        }
        const injectedDep = matchingDI[0];
        request.load(providedInstance, injectedDep);
    }
}
DependencyInjector.DEP_INJ_REQUESTS_KEY = "dependencyInjection.requests";
exports.default = DependencyInjector;
//# sourceMappingURL=Injector.js.map