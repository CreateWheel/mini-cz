import { execa } from "execa";
import type { ExecaChildProcess } from "execa";

const exec = async (command: string, args: string[] = []): Promise<ExecaChildProcess> => {
  try {
    return await execa(command, args);
  } catch (error) {
    return error as any;
  }
};

const gitStatus = async () => {
  const { stdout } = await exec("git", ["status", "--porcelain"]);
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

export const checkIsUserInfoConfigured = async () => {
  const { stdout: userName } = await exec("git", ["config", "user.name"]);
  const { stdout: userEmail } = await exec("git", ["config", "user.email"]);
  return !!userName && !!userEmail;
};
