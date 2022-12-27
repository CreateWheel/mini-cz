import { SingleCommand, defineCommand } from "clerc";

import { commit } from "../lib";
import { resolveConfig } from "../utils";

export const commitCommand = defineCommand({
  name: SingleCommand,
  description: "Commit!",
  flags: {
    add: {
      type: Boolean,
      description: "Add changes",
      default: false,
      alias: "a",
    },
  },
  handler: async ({ flags }) => {
    const config = await resolveConfig();
    const options = {
      add: flags.add,
    };
    await commit(config, options);
  },
});
