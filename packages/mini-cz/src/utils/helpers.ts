import * as kons from "kons";

import type { Config } from "../types";

export function errorAndExit(msg: string): never {
  kons.error(msg);
  process.exit(1);
}

export const defineConfig = (c: Config) => c;
