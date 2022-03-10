import { createUniqueId } from "solid-js";

export const createId = createUniqueId;

let lastId = 0;

export function uniqueId(prefix = "id") {
  lastId++;
  return `${prefix}${lastId}`;
}

export function createFallbackId(id: string | undefined) {
  if (id) {
    return id;
  }
  return uniqueId();
}
