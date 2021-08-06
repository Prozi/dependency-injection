import ProvidedDependency from "./ProvidedDependency";
import InjectionRequest from "./InjectionRequest";
import BaseInjectionRequest from "./BaseInjectionRequest";
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
export default class NamedInjectionRequest extends BaseInjectionRequest implements InjectionRequest {
    valueName: string;
    valuePrototype: any;
    constructor(propertyKey: string, targetPrototype: any, name: any, valuePrototype?: any);
    matches(value: ProvidedDependency): boolean;
    toString(): string;
}
