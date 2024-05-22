import "reflect-metadata";

import InjectionRequest from "./InjectionRequest";
import ProvidedDependency from "./ProvidedDependency";

export default class DependencyInjector {
  static readonly DEP_INJ_REQUESTS_KEY: string = "dependencyInjection.requests";

  public static getRequests(target: ProvidedDependency): InjectionRequest[] {
    const instance = target.getInstance();

    if (typeof instance !== "object") return [];

    const prototype: typeof instance = Object.getPrototypeOf(instance);
    const requests: InjectionRequest[] = Reflect.getMetadata(
      DependencyInjector.DEP_INJ_REQUESTS_KEY,
      prototype,
    );

    return requests || [];
  }

  public resolveRequest(
    request: InjectionRequest,
    providedInstance: ProvidedDependency,
    deps: ProvidedDependency[],
    strict: boolean,
  ): void {
    const matchingDI: ProvidedDependency[] = [];

    for (const prop in deps) {
      if (!deps.hasOwnProperty(prop)) continue;

      const dep = deps[prop];

      // Skip self-injection
      if (dep.getInstance() === providedInstance.getInstance()) continue;

      // Check if the dependency matches the request
      if (request.matches(dep)) {
        matchingDI.push(dep);
      }
    }

    // Throw an error if more than one dependency matches the request, as the context is ambiguous.
    if (matchingDI.length > 1) {
      throw new Error(
        `Ambiguous context with ${matchingDI.length} matching dependencies.`,
      );
    }

    // Throw an error or warn if no provided dependency fulfills the request
    if (matchingDI.length === 0) {
      const message = `${request.toString()} was not resolved.`;

      if (strict) {
        throw new Error(message);
      }
    }

    const injectedDep = matchingDI[0];

    request.load(providedInstance, injectedDep);
  }
}
