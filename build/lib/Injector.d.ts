import "reflect-metadata";
import InjectionRequest = require("./InjectionRequest");
import ProvidedDependency = require("./ProvidedDependency");
declare class DependencyInjector {
    static readonly DEP_INJ_REQUESTS_KEY: string;
    static getRequests(target: ProvidedDependency): InjectionRequest[];
    resolveRequest(request: InjectionRequest, providedInstance: ProvidedDependency, deps: ProvidedDependency[], strict: boolean): void;
}
export = DependencyInjector;
