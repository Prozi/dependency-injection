import chai from "chai";

import * as DI from "../index";

const assert = chai.assert;

class Dependency1 {}
class Dependency2 {}
class SubDependency1 extends Dependency1 {}

class MyClass {
  @DI.Injection(Dependency1)
  public dep: Dependency1;
}

class MyChildClass extends MyClass {}

class SelfInjectingClass {
  @DI.Injection(SelfInjectingClass)
  public dep: SelfInjectingClass;
}

describe("PrototypeInjection unit test", () => {
  let context: DI.Context,
    instance: MyClass,
    dep1: Dependency1,
    dep2: Dependency2;
  beforeEach(() => {
    context = new DI.Context();
    instance = new MyClass();
    dep1 = new Dependency1();
    dep2 = new Dependency2();
  });
  it("should be injected when the prototype matches", () => {
    context.addValue(instance);
    context.addValue(dep1);
    context.resolve();

    assert.equal(instance.dep, dep1, "The dependence is injected");
  });

  it("should not be injected when the prototype is different", () => {
    context.addValue(instance);
    context.addValue(dep2);

    context.resolve();
    assert.isUndefined(instance.dep, "The dependence is undefined");
  });

  it("should only inject the prototypes that matches", () => {
    context.addValue(instance);
    context.addValue(dep2); // add a non-matching dependency to the context
    context.addValue(dep1);
    context.addValue(dep2); // add a non-matching dependency to the context
    context.resolve();

    assert.equal(instance.dep, dep1, "The right dependence is injected");
  });

  it("should also inject if the target instance is a child of the annotated class", () => {
    instance = new MyChildClass();
    context.addValue(instance);
    context.addValue(dep1);
    context.resolve();

    assert.equal(instance.dep, dep1, "The dependence is injected");
  });

  it("should throw an exception if the context is ambiguous", () => {
    context.addValue(instance);
    context.addValue(dep1);
    context.addValue(new Dependency1());

    chai
      .expect(() => {
        context.resolve();
      })
      .to.throw();
  });
  it("should throw an exception if the context is ambiguous because of inheritance", () => {
    context.addValue(instance);
    context.addValue(dep1);
    context.addValue(new SubDependency1());

    chai
      .expect(() => {
        context.resolve();
      })
      .to.throw();
  });

  it("should not inject itself", () => {
    const self1 = new SelfInjectingClass();
    context.addValue(self1);
    context.resolve();

    assert.isUndefined(self1.dep);
  });

  it("should not create an ambiguous context thanks to self-injection prevention", () => {
    const self1 = new SelfInjectingClass();
    const self2 = new SelfInjectingClass();
    context.addValue(self1);
    context.addValue(self2);
    context.resolve();
    assert.equal(self1.dep, self2);
    assert.equal(self2.dep, self1);
  });
});
