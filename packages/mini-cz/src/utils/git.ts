import { execa } from "execa";

const gitStatus = async () => {
  const { stdout } = await execa("git", ["status", "--porcelain"]);
  return stdout.split("\n");
};
export const haveUnaddedChanges = async () => {
  const unaddedChanges = (await gitStatus()).some(s => s[1] === "M");
  return unaddedChanges;
};

export const noFileIsAdded = async () => {
  const isNoFileAdded = (await gitStatus()).every(s => s[0] === "?" || s[0] === " ");
  return isNoFileAdded;
};
