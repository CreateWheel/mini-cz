import { Root, defineCommand } from "clerc";

import { resolveConfig } from "../utils";
import type { CommitOptions } from "../lib";

export const commitCommand = defineCommand(
  {
    name: Root,
    description: "Commit!",
    alias: "commit",
    flags: {
      add: {
        type: Boolean,
        description: "Add changes",
        default: false,
        alias: "a",
      },
      message: {
        type: String,
        description: "Commit message",
        alias: "m",
      },
      breaking: {
        type: Boolean,
        description: "Is breaking change",
        default: false,
        alias: "b",
      },
      kind: {
        type: String,
        description: "Commit type",
        alias: "k",
      },
      scope: {
        type: String,
        description: "Commit scope",
        alias: "s",
      },
    },
  },
  async ({ flags }) => {
    const { commit } = await import("../lib");
    const config = await resolveConfig()
    await commit(config, flags);
  },
);
