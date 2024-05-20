import ProvidedDependency from "./ProvidedDependency";
export default class NamedProvidedDependency extends ProvidedDependency {
    private name;
    constructor(instance: any, name: string);
    getName(): string;
}
