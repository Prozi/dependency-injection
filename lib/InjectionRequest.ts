import ProvidedDependency from "./ProvidedDependency";

export default interface InjectionRequest {
  matches(value: ProvidedDependency): boolean;
  load(target: ProvidedDependency, value: ProvidedDependency): void;
}
