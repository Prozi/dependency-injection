import "reflect-metadata";
export declare function Injection(typeToInject: any): (target: Object, propertyKey: string | symbol) => void;
export declare function NamedInjection(name: any, typeToInject?: any): (target: Object, propertyKey: string | symbol) => void;
export declare function AutoInject(dependencyClass: any): (prototype: any, propertyKey: any) => any;
export declare function DirectLoad(constructor: any): any;
