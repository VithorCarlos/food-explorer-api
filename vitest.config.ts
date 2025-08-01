import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    test: {
      globals: true,
      root: "./",
      environment: "/prisma/vitest-evironment-prisma/prisma-test-evironment.ts",
    },

    plugins: [tsconfigPaths()],
  };
});
