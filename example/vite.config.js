import { defineConfig } from "vite";
import solid from "solid-start";

export default defineConfig({
  plugins: [solid()],
  optimizeDeps: {
    include: [
      "warning",
      "flatpickr",
      "copy-to-clipboard",
      "lodash.debounce",
      "lodash.findlast",
    ],
  },
});
