import ProvidedDependency = require("./ProvidedDependency");
declare class NamedProvidedDependency extends ProvidedDependency {
    private name;
    constructor(instance: any, name: string);
    getName(): string;
}
export = NamedProvidedDependency;
