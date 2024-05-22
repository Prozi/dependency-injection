import chai from "chai";

import * as DI from "../index";

const assert = chai.assert;

class Dependency1 {}
class Dependency2 {}

class MyClass {
  @DI.Injection(Dependency1)
  public protoDep1: Dependency1;

  @DI.Injection(Dependency2)
  public protoDep2: Dependency2;

  @DI.NamedInjection("my_dep")
  public namedDep: any;
}

describe("Context testing", () => {
  let c1: DI.Context,
    c2: DI.Context,
    instance: MyClass,
    dep1: Dependency1,
    dep2: Dependency2;

  beforeEach(() => {
    c1 = new DI.Context();
    c2 = new DI.Context();
    instance = new MyClass();
    dep1 = new Dependency1();
    dep2 = new Dependency2();
  });

  it("should not inject in another context", () => {
    c1.addValue(instance);
    c1.addValue(dep1);
    c2.addValue(dep2);

    c1.resolve();
    c2.resolve();

    assert.equal(instance.protoDep1, dep1, "protoDep1 has the right value");
    assert.isUndefined(instance.protoDep2, "protoDep2 is undefined");
  });

  it("should throw an error if a dependency is not met, only in strict mode", () => {
    c1.addValue(instance);

    chai
      .expect(() => {
        c1.resolve();
      })
      .to.not.throw(Error);

    chai
      .expect(() => {
        c1.resolveStrict();
      })
      .to.throw(Error);
  });
});
