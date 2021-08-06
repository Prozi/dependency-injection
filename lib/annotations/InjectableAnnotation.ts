import InjectableClass from "../Injectable";

export default function Injectable(constructor) {
  // Register it in the singleton registry
  InjectableClass.addInjectable(constructor);
}
