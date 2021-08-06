import Deps = require("../index");

export import Config = Deps.Config;

@Deps.Injectable
export class MyInjectable {
  public singletonMethod(): void {
    console.log("Hello!");
  }
}

export class MyClass {
  @Deps.Inject(MyInjectable)
  public attr: MyInjectable;

  public myMethod(): void {
    console.log("This is my method!");
  }
}

@Deps.DirectLoad
export class MyClassWithDirectLoad {
  @Deps.Inject(MyInjectable)
  public attr: MyInjectable; // = null;

  public myMethod(): void {
    console.log("This is another method!");
  }
}
