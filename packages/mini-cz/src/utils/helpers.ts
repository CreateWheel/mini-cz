import * as kons from "kons";

import type { Config } from "../types";

export const errorAndExit = (msg: string) => {
  kons.error(msg);
  process.exit(1);
};

export const defineConfig = (c: Config) => c;
