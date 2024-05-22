import BaseInjectionRequest from "./BaseInjectionRequest";
import InjectionRequest from "./InjectionRequest";
import ProvidedDependency from "./ProvidedDependency";

/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
export default class PrototypeInjectionRequest
  extends BaseInjectionRequest
  implements InjectionRequest
{
  public valuePrototype;

  constructor(propertyKey: string, targetPrototype, valuePrototype) {
    if (typeof valuePrototype === "function") {
      throw new Error(
        "Should pass the prototype for the value '" +
          valuePrototype.name +
          "', not its constructor!",
      );
    }
    super(propertyKey, targetPrototype);
    this.valuePrototype = valuePrototype;
  }

  public matches(value: ProvidedDependency): boolean {
    return this.valuePrototype.isPrototypeOf(value.getInstance());
  }
}
