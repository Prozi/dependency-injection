import chai from "chai";
import { Injectable, Inject } from "../lib/DI";

const assert = chai.assert;

@Injectable
class TestService {
  foo: string = "bar";
}

class TestComponent {
  @Inject(TestService) service: TestService;

  baz: string;

  constructor() {
    this.baz = this.service.foo;
  }
}

describe("GIVEN Injectable, Inject", () => {
  it("THEN example from readme works", () => {
    assert.equal(new TestComponent().baz, "bar", "base injection works");
  });
});
