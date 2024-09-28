import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { envOnlyMacros } from "vite-env-only"
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
  ],
});
