import ProvidedDependency from "./ProvidedDependency";

export default class NamedProvidedDependency extends ProvidedDependency {
  private name: string;

  constructor(instance: any, name: string) {
    super(instance);
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}
