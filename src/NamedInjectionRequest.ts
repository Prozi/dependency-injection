import BaseInjectionRequest from "./BaseInjectionRequest";
import InjectionRequest from "./InjectionRequest";
import NamedProvidedDependency from "./NamedProvidedDependency";
import ProvidedDependency from "./ProvidedDependency";

/**
 * This class represents an injection request based on the prototype.
 * This means that any provided instance that is using the prototype in the request
 * will be matched.
 */
export default class NamedInjectionRequest
  extends BaseInjectionRequest
  implements InjectionRequest
{
  public valueName: string;
  public valuePrototype;

  constructor(propertyKey: string, targetPrototype, name, valuePrototype?) {
    if (valuePrototype && typeof valuePrototype === "function") {
      throw new Error(
        "Should pass the prototype for the value '" +
          valuePrototype.name +
          "', not its constructor!",
      );
    }

    super(propertyKey, targetPrototype);

    this.valueName = name;
    this.valuePrototype = valuePrototype;
  }

  public matches(value: ProvidedDependency): boolean {
    if (!(value instanceof NamedProvidedDependency)) {
      return false;
    }
    const namedDep = <NamedProvidedDependency>value;
    const nameMatch = this.valueName === namedDep.getName();
    const prototypeMatch = this.valuePrototype
      ? this.valuePrototype.isPrototypeOf(value.getInstance())
      : true;

    return nameMatch && prototypeMatch;
  }

  public toString(): string {
    let suffix = "";

    if (this.valuePrototype) {
      suffix += this.valuePrototype.constructor.name + "@";
    }

    suffix += this.valueName;

    return super.toString() + "=" + suffix;
  }
}
