import { createComputed, createMemo, createSignal } from "solid-js";

export function createDerivedSignal<T>(derived: () => T) {
  const memoized = createMemo(() => derived());
  const [read, write] = createSignal<T>();
  createComputed(() => write(() => memoized()));
  return [read, write];
}
