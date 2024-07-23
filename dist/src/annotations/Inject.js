"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injection = Injection;
exports.NamedInjection = NamedInjection;
exports.Inject = Inject;
exports.DirectLoad = DirectLoad;
require("reflect-metadata");
const Config_1 = __importDefault(require("../Config"));
const Injectable_1 = __importDefault(require("../Injectable"));
const NamedInjectionRequest_1 = __importDefault(require("../NamedInjectionRequest"));
const PrototypeInjectionRequest_1 = __importDefault(require("../PrototypeInjectionRequest"));
function Injection(typeToInject) {
    return function (target, propertyKey) {
        addPrototypeInjectionRequest(target, typeToInject.prototype, propertyKey);
    };
}
function NamedInjection(name, typeToInject) {
    const proto = typeToInject ? typeToInject.prototype : null;
    return function (target, propertyKey) {
        addNamedInjectionRequest(target, name, propertyKey, proto);
    };
}
function Inject(dependencyClass) {
    if (!dependencyClass)
        throw new Error("Missing parameter!");
    return function (prototype, propertyKey) {
        // We define this as a safeguard if the user doesn't call @DirectLoad
        Object.defineProperty(prototype, propertyKey, {
            get: function () {
                // If we don't have to use getters, we'll use the first call to inject
                // all the values
                if (!Config_1.default.useGetters) {
                    const isInjected = Reflect.getOwnMetadata("isInjected", prototype)
                        ? true
                        : false;
                    if (!isInjected) {
                        removeGettersFromPrototype(prototype);
                        autoLoadInjectors(this, prototype);
                    }
                }
                return Injectable_1.default.getInjectable(dependencyClass).get();
            },
            enumerable: true,
            configurable: true, // to be able to remove it from the prototype later
        });
        // We define this if the user wants to use the @DirectLoad annotation
        const singletons = Reflect.getOwnMetadata("singletonInjectors", prototype) || {};
        singletons[propertyKey] = function () {
            this[propertyKey] = Injectable_1.default.getInjectable(dependencyClass).get();
        };
        Reflect.defineMetadata("singletonInjectors", singletons, prototype);
        return prototype;
    };
}
function autoLoadInjectors(target, proto) {
    Reflect.defineMetadata("isInjected", true, proto);
    const singletonInjectors = Reflect.getOwnMetadata("singletonInjectors", proto) || [];
    loadInjectableInjectors(singletonInjectors, target);
}
function loadInjectableInjectors(singletonInjectors, target) {
    for (const propertyKey in singletonInjectors) {
        if (!singletonInjectors.hasOwnProperty(propertyKey))
            continue;
        const s = singletonInjectors[propertyKey];
        s.apply(target);
    }
}
function removeGettersFromPrototype(proto) {
    const singletonInjectors = Reflect.getOwnMetadata("singletonInjectors", proto) || {};
    for (const propertyKey in singletonInjectors) {
        if (!singletonInjectors.hasOwnProperty(propertyKey))
            continue;
        if (!delete proto[propertyKey]) {
            throw new Error("Failed to delete property getter!");
        }
    }
}
function DirectLoad(constructor) {
    const proto = constructor.prototype;
    // Remove the getter override
    removeGettersFromPrototype(proto);
    const wrapper = function () {
        autoLoadInjectors(this, proto);
        constructor.apply(this, arguments);
    };
    wrapper.prototype = proto;
    return wrapper;
}
function addInjectionRequest(targetPrototype, injectionPrototype, request) {
    const protoName = targetPrototype.constructor.name;
    const injectionName = injectionPrototype
        ? injectionPrototype.constructor.name
        : null;
    // Check that the names are valid
    if (!protoName)
        throw new Error("Incorrect prototype! No name found!");
    // Throw error if the 'injectionPrototype' is provided but the name is a false-value
    if (injectionPrototype && !injectionName)
        throw new Error("Incorrect prototype! No name found!");
    // Register the injection request
    let protoInjectionRequests;
    const DEP_INJ_REQUESTS_KEY = "dependencyInjection.requests";
    if (!Reflect.hasMetadata(DEP_INJ_REQUESTS_KEY, targetPrototype)) {
        protoInjectionRequests = [];
        Reflect.defineMetadata(DEP_INJ_REQUESTS_KEY, [], targetPrototype);
    }
    else {
        protoInjectionRequests = Reflect.getMetadata(DEP_INJ_REQUESTS_KEY, targetPrototype);
    }
    protoInjectionRequests.push(request);
    Reflect.defineMetadata(DEP_INJ_REQUESTS_KEY, protoInjectionRequests, targetPrototype);
}
function addPrototypeInjectionRequest(targetPrototype, injectionPrototype, propertyKey) {
    const request = new PrototypeInjectionRequest_1.default(propertyKey, targetPrototype, injectionPrototype);
    addInjectionRequest(targetPrototype, injectionPrototype, request);
}
function addNamedInjectionRequest(targetPrototype, name, propertyKey, injectionPrototype) {
    const request = new NamedInjectionRequest_1.default(propertyKey, targetPrototype, name, injectionPrototype);
    addInjectionRequest(targetPrototype, injectionPrototype, request);
}
//# sourceMappingURL=Inject.js.map