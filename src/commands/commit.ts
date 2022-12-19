import { SingleCommand, defineCommand } from "clerc";

import { commit } from "../lib";
import { resolveConfig } from "../utils";

export const commitCommand = defineCommand({
  name: SingleCommand,
  description: "Commit!",
  flags: {
    all: {
      type: Boolean,
      description: "Commit all changes",
      default: false,
      alias: "a",
    },
  },
  handler: async(ctx) => {
    const config = await resolveConfig();
    const options = {
      all: ctx.flags.all,
    };
    await commit(config, options);
  },
});
