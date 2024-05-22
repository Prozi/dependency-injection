import InjectionRequest from "./InjectionRequest";
import DependencyInjector from "./Injector";
import NamedProvidedDependency from "./NamedProvidedDependency";
import PrototypeProvidedDependency from "./PrototypeProvidedDependency";
import ProvidedDependency from "./ProvidedDependency";

/**
 * Data class to hold the link between request and instance
 */
class InjectionRequestInstance {
  request: InjectionRequest;
  instance: ProvidedDependency;

  public constructor(request: InjectionRequest, instance: any) {
    this.request = request;
    this.instance = instance;
  }
}

export default class DependencyInjectionContext {
  private providedDependencies: ProvidedDependency[];

  private injector: DependencyInjector;

  private requests: InjectionRequestInstance[];

  constructor() {
    this.providedDependencies = [];
    this.injector = new DependencyInjector();
  }

  private loadRequests(dep: ProvidedDependency): void {
    const self = this;
    DependencyInjector.getRequests(dep).map(function (r) {
      self.requests.push(new InjectionRequestInstance(r, dep));
    });
  }

  public addValue(instance: any, name?: string): void {
    if (name) {
      // logger.debug("Adding named dep: {}", name);
      this.addNamedValue(instance, name);
      //this.providedDependencies.push(new NamedProvidedDependency(instance, name));
    } else {
      this.providedDependencies.push(new PrototypeProvidedDependency(instance));
    }
  }

  public addNamedValue(instance: any, name: string): void {
    // Store the dependency
    this.providedDependencies.push(new NamedProvidedDependency(instance, name));
  }

  public resolve(strict = false): void {
    // Build the request list
    this.requests = [];
    for (const i in this.providedDependencies) {
      if (!this.providedDependencies.hasOwnProperty(i)) continue;
      const dep = this.providedDependencies[i];
      this.loadRequests(dep);
    }

    // Resolve the requests
    for (const i in this.requests) {
      if (!this.requests.hasOwnProperty(i)) continue;
      const r = this.requests[i];
      this.injector.resolveRequest(
        r.request,
        r.instance,
        this.providedDependencies,
        strict,
      );
    }
  }

  public resolveStrict(): void {
    this.resolve(true);
  }
}
