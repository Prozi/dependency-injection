import * as DI from "../index";

export import Config = DI.Config;

@DI.Injectable
export class MyInjectable {
  public singletonMethod(): void {
    console.log("Hello!");
  }
}

export class MyClass {
  @DI.Inject(MyInjectable)
  public attr: MyInjectable;

  public myMethod(): void {
    console.log("This is my method!");
  }
}

@DI.DirectLoad
export class MyClassWithDirectLoad {
  @DI.Inject(MyInjectable)
  public attr: MyInjectable; // = null;

  public myMethod(): void {
    console.log("This is another method!");
  }
}
