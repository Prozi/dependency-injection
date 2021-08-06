import ProvidedDependency from "./ProvidedDependency";
/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
export default class BaseInjectionRequest {
    protected targetPrototype: Object;
    private propertyKey;
    private loadingCallback;
    constructor(propertyKey: string, targetPrototype: any);
    matches(value: any): boolean;
    load(target: ProvidedDependency, value: ProvidedDependency): void;
    toString(): string;
}
