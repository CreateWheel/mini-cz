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
  return  (await gitStatus()).some((s) => s[1] === "M");

  
}

export async function noFileIsAdded() {
  return (await gitStatus()).every(
    (s) => s[0] === "?" || s[0] === " ",
  );


}

export async function checkIsUserInfoConfigured() {
  const { stdout: userName } = await exec("git", ["config", "user.name"]);
  const { stdout: userEmail } = await exec("git", ["config", "user.email"]);

  return !!userName && !!userEmail;
}
