import "reflect-metadata";
import InjectionRequest from "./InjectionRequest";
import ProvidedDependency from "./ProvidedDependency";
export default class DependencyInjector {
    static readonly DEP_INJ_REQUESTS_KEY: string;
    static getRequests(target: ProvidedDependency): InjectionRequest[];
    resolveRequest(request: InjectionRequest, providedInstance: ProvidedDependency, deps: ProvidedDependency[], strict: boolean): void;
}
