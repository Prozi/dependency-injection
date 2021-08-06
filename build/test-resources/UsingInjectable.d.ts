import * as DI from "../index";
export import Config = DI.Config;
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
