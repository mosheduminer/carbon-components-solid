import { defineConfig } from "vite";
import solid from "solid-start";

export default defineConfig({
  plugins: [solid()],
  optimizeDeps: {
    include: [
      "carbon-components",
      "carbon-components/es/globals/js/settings",
      "warning",
      "flatpickr",
      "flatpickr/dist/l10n/index",
      "flatpickr/dist/plugins/rangePlugin",
      "copy-to-clipboard",
      "lodash.debounce",
      "lodash.findlast",
    ],
  },
  ssr: {
    noExternal: [
      "carbon-components",
    ],
  }
});
