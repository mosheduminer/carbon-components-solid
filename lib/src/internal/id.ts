import { settings } from "carbon-components";
const { prefix } = settings;

const setupCreateId = () => {
  let i = 0;
  return () => {
    return `${prefix}-${i++}`
  }
}

export const createId = setupCreateId();