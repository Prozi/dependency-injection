import InjectionRequest = require("./InjectionRequest");
import BaseInjectionRequest = require("./BaseInjectionRequest");
import ProvidedDependency = require("./ProvidedDependency");
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
declare class PrototypeInjectionRequest extends BaseInjectionRequest implements InjectionRequest {
    valuePrototype: any;
    constructor(propertyKey: string, targetPrototype: any, valuePrototype: any);
    matches(value: ProvidedDependency): boolean;
}
export = PrototypeInjectionRequest;
