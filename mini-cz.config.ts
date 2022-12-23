import configDefault from "./packages/config-default/src/index";
import { defineConfig } from "./packages/mini-cz/src/index";

export default defineConfig({
  ...configDefault,
  scopes: [
    "core",
    "config-default",
  ],
});
