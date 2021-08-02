import Deps = require("../index");
export import Config = Deps.Config;
export declare class MyInjectable {
    singletonMethod(): void;
}
export declare class MyClass {
    attr: MyInjectable;
    myMethod(): void;
}
export declare class MyClassWithDirectLoad {
    attr: MyInjectable;
    myMethod(): void;
}
