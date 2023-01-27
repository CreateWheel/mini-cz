import { execa } from "execa";

export const haveUnaddedChanges = async () => {
  const { stdout } = await execa("git", ["status", "--porcelain"]);
  const unaddedChanges = stdout.split("\n")
    .some(s => s[1] === "M");
  return unaddedChanges;
};

export const noFileIsAdded = async () => {
  const { stdout } = await execa("git", ["status", "--porcelain"]);
  const isNoFileAdded = stdout.split("\n")
    .every(s => s[0] === "?" || s[0] === " ");
  return isNoFileAdded;
};
