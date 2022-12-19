import { loadConfig } from "unconfig";

import type { Config } from "../types";
import { errorAndExit } from "./helpers";

export const resolveConfig = async () => {
  const { config } = await loadConfig<Config>({
    sources: [
      {
        files: "mini-cz.config",
        extensions: ["ts", "mts", "cts", "js", "mjs", "cjs", "json", ""],
      },
      {
        files: "package.json",
        extensions: [],
        rewrite (config: any) {
          return config["mini-cz"];
        },
      },
    ],
    merge: false,
  });
  if (!config) {
    errorAndExit("Config file not found!");
  }
  return config;
};
