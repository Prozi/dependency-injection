declare class DependencyInjectionContext {
    private providedDependencies;
    private injector;
    private requests;
    constructor();
    private loadRequests;
    addValue(instance: any, name?: string): void;
    addNamedValue(instance: any, name: string): void;
    resolve(strict?: boolean): void;
    resolveStrict(): void;
}
export = DependencyInjectionContext;
