import { exec } from "clerc/toolkit";

export const haveUnaddedChanges = async () => {
  const { stdout } = await exec("git", ["status", "--porcelain"]);
  return stdout.length > 0;
};
