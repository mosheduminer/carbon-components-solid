import { Accessor, createComputed, createSignal, Setter } from "solid-js";

export function createDerivedSignal<T>(derived: () => T) {
  const [read, write] = createSignal<T>();
  createComputed(() => write(() => derived()));
  return [read, write] as [Accessor<T>, Setter<T>];
}
