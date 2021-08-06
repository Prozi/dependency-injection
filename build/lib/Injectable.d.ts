export default class Injectable<T> {
    private static classes;
    private factory;
    private instance;
    constructor(classConstructor: new () => T);
    get(): T;
    static addInjectable(factory: new () => any): void;
    static getInjectable<A>(factory: new () => A): Injectable<A>;
}
