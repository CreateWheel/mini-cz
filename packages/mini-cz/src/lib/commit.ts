import * as kons from "kons";
import { execa } from "execa";
import prompt from "prompts";
import task from "tasuku";

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
  if (await haveUnaddedChanges() && !add) {
    const { addAll } = await prompt({
      name: "addAll",
      message: "You have unadded changes. Do you want to add all changes?",
      type: "confirm",
    });
    add = addAll;
  }

  if (add) {
    task("git add -A", async ({ setTitle }) => {
      setTitle("git add -A");
      await execa("git", ["add", "-A"]);
    });
  }

  if (await noFileIsAdded()) {
    errorAndExit("No file is added. Aborting.");
  }

  const kindChoices = config.kinds.map(({ name, description }) => ({
    title: name,
    value: name,
    description,
  }));
  const promptKind = async () => {
    kind = await prompt({
      name: "kind",
      message: "Choose commit kind:",
      type: "autocomplete",
      choices: kindChoices,
    }).then(({ kind }) => kind);
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
    breaking = await prompt({
      name: "isBreaking",
      message: "Is this a breaking change?",
      type: "confirm",
    }).then(({ isBreaking }) => isBreaking);
  }

  if (!kind) {
    errorAndExit("Kind is required!");
  }

  const scopeChoices = (config.scopes || []).map(scope => ({
    title: scope,
    value: scope,
  }));
  const promptScope = async () => {
    scope = config.scopes?.length
      ? await prompt({
        name: "scope",
        message: "Choose commit scope:",
        type: "autocomplete",
        choices: scopeChoices,
      }).then(({ scope }) => scope)
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
    message = await prompt({
      name: "message",
      message: "Enter commit message:",
      type: "text",
    }).then(({ message }) => message);
  }

  if (!message) {
    errorAndExit("Message is required!");
  }

  const selectedKind = config.kinds.find(k => k.name === kind);
  const commitMessage = generateCommitMessage({ kind: kind!, scope, message: message!, emoji: selectedKind?.emoji, breaking: breaking! });
  task("git commit", async ({ setTitle }) => {
    setTitle("git commit");
    await execa("git", ["commit", "-m", commitMessage], { stdio: "ignore" });
  });
};
