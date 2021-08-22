import { createUniqueId } from "solid-js";

export const createId = createUniqueId;

let lastId = 0;

export function uniqueId(prefix = 'id') {
  lastId++;
  return `${prefix}${lastId}`;
}