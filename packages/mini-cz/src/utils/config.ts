import { loadConfig } from "c12";

import type { Config } from "../types";

import { errorAndExit } from "./helpers";

export const resolveConfig = async () => {
  const { config } = await loadConfig<Config>({
    name: "mini-cz",
  });
  if (Object.keys(config!).length === 0) {
    errorAndExit("Config file not found!");
  }
  return config!;
};
