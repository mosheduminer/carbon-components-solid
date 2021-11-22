import { createComputed, createMemo, createSignal } from "solid-js";

export function createDerivedSignal<T>(derived: () => T) {
  const [read, write] = createSignal<T>();
  createComputed(() => write(() => derived()));
  return [read, write];
}
