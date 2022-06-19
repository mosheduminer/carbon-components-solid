import { defineConfig } from "vite";
import solid from "solid-start";
import staticAdapter from "solid-start-static";

export default defineConfig({
  plugins: [solid({ adapter: staticAdapter() })],
  optimizeDeps: {
    include: [
      "warning",
      "flatpickr",
      "flatpickr/dist/l10n/index",
      "flatpickr/dist/plugins/rangePlugin",
      "copy-to-clipboard",
    ],
  },
  ssr: {
    noExternal: [
      // "warning",
      // "flatpickr",
      // "flatpickr/dist/l10n/index",
      // "flatpickr/dist/plugins/rangePlugin",
      // "copy-to-clipboard",
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
