import { Clerc, friendlyErrorPlugin, helpPlugin, notFoundPlugin, strictFlagsPlugin, versionPlugin } from "clerc";

import { description, version } from "../package.json";
import { commitCommand } from "./commands";

const _cli = Clerc.create()
  .name("mcz")
  .description(description)
  .version(version)
  .use(helpPlugin({ command: false }))
  .use(notFoundPlugin())
  .use(strictFlagsPlugin())
  .use(versionPlugin({ command: false }))
  .use(friendlyErrorPlugin())
  .command(commitCommand)
  .parse();
