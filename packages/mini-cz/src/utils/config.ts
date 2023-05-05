import { loadConfig } from "yajuu";

import type { Config } from "../types";

import { errorAndExit } from "./helpers";

export const resolveConfig = async () => {
  const { config } = await loadConfig<Config>({
    name: "mini-cz",
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  if (Object.keys(config!).length === 0) {
    errorAndExit("Config file not found!");
  }
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return config!;
};
