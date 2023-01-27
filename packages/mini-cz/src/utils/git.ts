import { execa } from "execa";

export const haveUnaddedChanges = async () => {
  const { stdout } = await execa("git", ["status", "--porcelain"]);
  const unaddedChanges = stdout.split("\n")
    .some(s => s[1] === "M");
  return unaddedChanges;
};
