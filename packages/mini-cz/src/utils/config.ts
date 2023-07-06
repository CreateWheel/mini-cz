import { loadConfig } from "yajuu";

import type { Config } from "../types";
import { errorAndExit } from "./helpers";

export async function resolveConfig() {
  const { config } = await loadConfig<Config>({
    name: "mini-cz",
  });
  if (Object.keys(config!).length === 0) {
    errorAndExit("Config file not found or it does not have a default export.");
  }

  return config!;
}
