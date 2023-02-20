import { confirm, intro, outro, select, spinner, text } from "@clack/prompts";
import pc from "picocolors";
import * as kons from "kons";
import { execa } from "execa";

import type { Config } from "../types";
import { errorAndExit } from "../utils";
import { haveUnaddedChanges, noFileIsAdded } from "../utils/git";

interface GenerateCommitOptions {
  kind: string
  breaking: boolean
  emoji?: string
  scope?: string
  message: string
}
const generateCommitMessage = ({ kind, scope, emoji, message, breaking }: GenerateCommitOptions) => {
  let commitMessage = "";
  if (emoji) {
    commitMessage += `${emoji} `;
  }
  commitMessage += kind;
  if (scope) {
    commitMessage += `(${scope})`;
  }
  if (breaking) {
    commitMessage += "!";
  }
  commitMessage += ": ";
  commitMessage += message;
  return commitMessage;
};

interface CommitOptions {
  add?: boolean
  message?: string
  breaking?: boolean
  kind?: string
  scope?: string
}

export const commit = async (
  config: Config,
  {
    add = false,
    message,
    breaking,
    kind,
    scope,
  }: CommitOptions = {},
) => {
  intro(pc.inverse("Mini CZ: Commit"));
  if (await haveUnaddedChanges() && !add) {
    add = await confirm({
      message: "You have unadded changes. Do you want to add all changes?",
      initialValue: false,
    }) as boolean;
  }

  if (add) {
    const s = spinner();
    s.start("git add -A");
    await execa("git", ["add", "-A"]);
    s.stop();
  }

  if (await noFileIsAdded()) {
    errorAndExit("No file is added. Aborting.");
  }

  const kindOptions = config.kinds.map(({ name, description }) => ({
    title: name,
    value: name,
    description,
  }));
  const promptKind = async () => {
    kind = await select({
      message: "Choose commit kind:",
      options: kindOptions,
    }) as string;
  };
  if (!kind) {
    await promptKind();
  }
  const kindNames = config.kinds.map(({ name }) => name);
  if (!kindNames.includes(kind!)) {
    kons.error("Invalid kind.");
    await promptKind();
  }

  if (!breaking) {
    breaking = await confirm({
      message: "Is this a breaking change?",
      initialValue: false,
    }) as boolean;
  }

  if (!kind) {
    errorAndExit("Kind is required!");
  }

  const scopeOptions = (config.scopes || []).map(scope => ({
    title: scope,
    value: scope,
  }));
  const promptScope = async () => {
    scope = config.scopes?.length
      ? await select({
        message: "Choose commit scope:",
        options: scopeOptions,
      }) as string
      : undefined;
  };

  if (!scope) {
    await promptScope();
  }

  if (config.scopes?.length && !config.scopes.includes(scope!)) {
    kons.error("Invalid scope.");
    await promptScope();
  }

  if (!message) {
    message = await text({
      message: "Enter commit message:",
    }) as string;
  }

  if (!message) {
    errorAndExit("Message is required!");
  }

  const selectedKind = config.kinds.find(k => k.name === kind);
  const commitMessage = generateCommitMessage({ kind: kind!, scope, message: message!, emoji: selectedKind?.emoji, breaking: breaking! });
  const s = spinner();
  s.start("git commit");
  await execa("git", ["commit", "-m", commitMessage], { stdio: "ignore" });
  s.stop();

  outro(pc.bgBlack("Mini CZ: Commit - Done!"));
};
