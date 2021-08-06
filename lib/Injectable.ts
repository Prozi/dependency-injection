export default class Injectable<T> {
  private static classes: any[] = [];

  private factory: new () => T;
  private instance: T;

  constructor(classConstructor: new () => T) {
    this.factory = classConstructor;
  }

  public get(): T {
    if (!this.instance) {
      this.instance = new this.factory();
    }

    return this.instance;
  }

  public static addInjectable(factory: new () => any): void {
    if (Injectable.classes.indexOf(factory) === -1) {
      Injectable.classes.push(new Injectable(factory));
    }
  }

  public static getInjectable<A>(factory: new () => A): Injectable<A> {
    const matching = Injectable.classes.filter(
      (currentInjectable) => currentInjectable.factory === factory
    );

    if (matching.length === 0) {
      throw new Error("No such singleton");
    }

    if (matching.length > 1) {
      throw new Error("Same singleton was declared twice");
    }

    return matching[0];
  }
}
