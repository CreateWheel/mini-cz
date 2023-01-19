import { Clerc, friendlyErrorPlugin, helpPlugin, notFoundPlugin, strictFlagsPlugin, versionPlugin } from "clerc";

import { description, version } from "../package.json";
import { commitCommand } from "./commands";

const _cli = Clerc.create("mcz", description, version)
  .use(helpPlugin())
  .use(notFoundPlugin())
  .use(strictFlagsPlugin())
  .use(versionPlugin())
  .use(friendlyErrorPlugin())
  .command(commitCommand)
  .parse();
