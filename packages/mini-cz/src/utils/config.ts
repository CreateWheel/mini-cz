import { loadConfig } from "c12";

import type { Config } from "../types";
import { errorAndExit } from "./helpers";

export const resolveConfig = async () => {
  const { config } = await loadConfig<Config>({
    name: "mini-cz",
  });
  if (!config) {
    errorAndExit("Config file not found!");
  }
  return config!;
};
