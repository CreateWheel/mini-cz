import { execa } from "execa";
import type { ExecaChildProcess } from "execa";

async function exec(
  command: string,
  args: string[] = [],
): Promise<ExecaChildProcess> {
  try {
    return await execa(command, args);
  } catch (error) {
    return error as any;
  }
}

async function gitStatus() {
  const { stdout } = await exec("git", ["status", "--porcelain"]);

  return stdout.split("\n");
}

export async function haveUnaddedChanges() {
  const unaddedChanges = (await gitStatus()).some((s) => s[1] === "M");

  return unaddedChanges;
}

export async function noFileIsAdded() {
  const isNoFileAdded = (await gitStatus()).every(
    (s) => s[0] === "?" || s[0] === " ",
  );

  return isNoFileAdded;
}

export async function checkIsUserInfoConfigured() {
  const { stdout: userName } = await exec("git", ["config", "user.name"]);
  const { stdout: userEmail } = await exec("git", ["config", "user.email"]);

  return !!userName && !!userEmail;
}
