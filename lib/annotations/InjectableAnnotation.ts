import InjectableClass = require("../Injectable");

function Injectable(constructor) {
  // Register it in the singleton registry
  InjectableClass.addInjectable(constructor);
}

export = Injectable;
