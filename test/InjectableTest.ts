import chai from "chai";

import * as DI from "../index";

const assert = chai.assert;

describe("Injectable unit test", () => {
  it("should have the value available", () => {
    const test = require("../test-resources/UsingInjectable");
    const a = new test.MyClass();

    assert.isDefined(a.attr);
    assert.isNotNull(a.attr);
    assert.instanceOf(a.attr, test.MyInjectable);

    const b = new test.MyClassWithDirectLoad();
    assert.equal(Object.keys(b).length, 1, "Object that are ");
  });
  it("should share the same singleton instance accross multiple values", () => {
    const test = require("../test-resources/UsingInjectable");
    const a = new test.MyClass();
    const b = new test.MyClass();

    assert.equal(a.attr, b.attr, "instance are shared");
  });

  describe("should use the Config", () => {
    it("should load the same config object", () => {
      const test = require("../test-resources/UsingInjectable");
      assert.equal(test.Config, DI.Config, "Configs should be the same");
    });
    describe("useGetters", () => {
      describe("useGetters = false", () => {
        let test;
        let warningSpy;

        before(() => {
          DI.Config.useGetters = false;
          test = require("../test-resources/UsingInjectable");
        });

        it("should contains the injected attributes in the keys after a getter call", () => {
          const a = new test.MyClass();
          assert.isTrue(
            Object.keys(a).indexOf("attr") === -1,
            "The key is not set yet",
          );
          a.attr; // trigger the loading
          assert.isTrue(
            Object.keys(a).indexOf("attr") !== -1,
            "The key is set",
          );
        });

        it("should warn that not using @DirectLoad is a perf killer...", () => {
          const a = new test.MyClass();
          a.attr;
          assert.isTrue(warningSpy.calledOnce);
        });
        it("should not warn when using @DirectLoad", () => {
          warningSpy.reset();
          const b = new test.MyClassWithDirectLoad();
          b.attr;
          assert.isFalse(warningSpy.called);
        });
      });

      describe("useGetter = true", () => {
        let test;
        before(() => {
          DI.Config.useGetters = true;
          test = require("../test-resources/UsingInjectable");
        });

        it("is not expected to have the object in the keys because we're using an internal getter", () => {
          const a = new test.MyClass();
          a.attr; // just to trigger the getter
          assert.isTrue(
            Object.keys(a).indexOf("attr") === -1,
            "Object.keys(a) does not contain the key 'attr'",
          );
        });
      });
    });
  });

  it("should have the value set directly if using @DirectLoad", () => {
    const test = require("../test-resources/UsingInjectable");

    const a = new test.MyClassWithDirectLoad();
    assert.isTrue(Object.keys(a).indexOf("attr") !== -1, "value is set!");
  });
});
