import "reflect-metadata";

import Config from "../Config";
import Injectable from "../Injectable";
import InjectionRequest from "../InjectionRequest";
import NamedInjectionRequest from "../NamedInjectionRequest";
import PrototypeInjectionRequest from "../PrototypeInjectionRequest";

export function Injection(typeToInject) {
  return function (target: Object, propertyKey: string | symbol) {
    addPrototypeInjectionRequest(target, typeToInject.prototype, propertyKey);
  };
}

export function NamedInjection(name, typeToInject?) {
  const proto = typeToInject ? typeToInject.prototype : null;

  return function (target: Object, propertyKey: string | symbol) {
    addNamedInjectionRequest(target, name, propertyKey, proto);
  };
}

export function Inject(dependencyClass) {
  if (!dependencyClass) throw new Error("Missing parameter!");
  return function (prototype, propertyKey) {
    // We define this as a safeguard if the user doesn't call @DirectLoad
    Object.defineProperty(prototype, propertyKey, {
      get: function () {
        // If we don't have to use getters, we'll use the first call to inject
        // all the values
        if (!Config.useGetters) {
          const isInjected = Reflect.getOwnMetadata("isInjected", prototype)
            ? true
            : false;
          if (!isInjected) {
            removeGettersFromPrototype(prototype);
            autoLoadInjectors(this, prototype);
          }
        }
        return Injectable.getInjectable(dependencyClass).get();
      },
      enumerable: true,
      configurable: true, // to be able to remove it from the prototype later
    });

    // We define this if the user wants to use the @DirectLoad annotation
    const singletons: { [propertyKey: string]: any } =
      Reflect.getOwnMetadata("singletonInjectors", prototype) || {};
    singletons[propertyKey] = function () {
      this[propertyKey] = Injectable.getInjectable(dependencyClass).get();
    };
    Reflect.defineMetadata("singletonInjectors", singletons, prototype);

    return prototype;
  };
}

function autoLoadInjectors(target, proto) {
  Reflect.defineMetadata("isInjected", true, proto);
  const singletonInjectors =
    Reflect.getOwnMetadata("singletonInjectors", proto) || [];
  loadInjectableInjectors(singletonInjectors, target);
}

function loadInjectableInjectors(singletonInjectors, target) {
  for (const propertyKey in singletonInjectors) {
    if (!singletonInjectors.hasOwnProperty(propertyKey)) continue;
    const s = singletonInjectors[propertyKey];
    s.apply(target);
  }
}

function removeGettersFromPrototype(proto) {
  const singletonInjectors: { [propertyKey: string]: any } =
    Reflect.getOwnMetadata("singletonInjectors", proto) || {};
  for (const propertyKey in singletonInjectors) {
    if (!singletonInjectors.hasOwnProperty(propertyKey)) continue;
    if (!delete proto[propertyKey]) {
      throw new Error("Failed to delete property getter!");
    }
  }
}

export function DirectLoad(constructor): any {
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

function addInjectionRequest(
  targetPrototype,
  injectionPrototype,
  request: InjectionRequest,
) {
  const protoName = targetPrototype.constructor.name;
  const injectionName = injectionPrototype
    ? injectionPrototype.constructor.name
    : null;

  // Check that the names are valid
  if (!protoName) throw new Error("Incorrect prototype! No name found!");

  // Throw error if the 'injectionPrototype' is provided but the name is a false-value
  if (injectionPrototype && !injectionName)
    throw new Error("Incorrect prototype! No name found!");

  // Register the injection request
  let protoInjectionRequests: InjectionRequest[];
  const DEP_INJ_REQUESTS_KEY = "dependencyInjection.requests";
  if (!Reflect.hasMetadata(DEP_INJ_REQUESTS_KEY, targetPrototype)) {
    protoInjectionRequests = [];
    Reflect.defineMetadata(DEP_INJ_REQUESTS_KEY, [], targetPrototype);
  } else {
    protoInjectionRequests = Reflect.getMetadata(
      DEP_INJ_REQUESTS_KEY,
      targetPrototype,
    );
  }
  protoInjectionRequests.push(request);
  Reflect.defineMetadata(
    DEP_INJ_REQUESTS_KEY,
    protoInjectionRequests,
    targetPrototype,
  );
}

function addPrototypeInjectionRequest(
  targetPrototype,
  injectionPrototype,
  propertyKey,
) {
  const request = new PrototypeInjectionRequest(
    propertyKey,
    targetPrototype,
    injectionPrototype,
  );
  addInjectionRequest(targetPrototype, injectionPrototype, request);
}

function addNamedInjectionRequest(
  targetPrototype,
  name: string,
  propertyKey: string | symbol,
  injectionPrototype,
) {
  const request = new NamedInjectionRequest(
    <string>propertyKey,
    targetPrototype,
    name,
    injectionPrototype,
  );
  addInjectionRequest(targetPrototype, injectionPrototype, request);
}
