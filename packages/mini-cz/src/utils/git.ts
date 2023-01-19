import { exec } from "clerc/toolkit";

export const haveUnaddedChanges = async () => {
  const { stdout } = await exec("git", ["status", "--porcelain"]);
  const unaddedChanges = stdout.split("\n")
    .some(s => s[1] === "M");
  return unaddedChanges;
};
