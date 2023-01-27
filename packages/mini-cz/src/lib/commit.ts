import { execa } from "execa";
import prompt from "prompts";
import task from "tasuku";

import type { Config } from "../types";
import { errorAndExit } from "../utils";
import { haveUnaddedChanges, noFileIsAdded } from "../utils/git";

interface GenerateCommitOptions {
  kind: string
  emoji?: string
  scope?: string
  description: string
}
const generateCommitMessage = ({ kind, scope, emoji, description }: GenerateCommitOptions) => {
  let commitMessage = "";
  if (emoji) {
    commitMessage += `${emoji} `;
  }
  commitMessage += kind;
  if (scope) {
    commitMessage += `(${scope})`;
  }
  commitMessage += ": ";
  commitMessage += description;
  return commitMessage;
};

interface CommitOptions {
  add?: boolean
}

export const commit = async (
  config: Config,
  {
    add = false,
  }: CommitOptions = {},
) => {
  if (await noFileIsAdded()) {
    errorAndExit("No file is added. Aborting.");
  }

  const kindChoices = config.kinds.map(({ name, description }) => ({
    title: name,
    value: name,
    description,
  }));

  const scopeChoices = (config.scopes || []).map(scope => ({
    title: scope,
    value: scope,
  }));

  const { kind } = await prompt({
    name: "kind",
    message: "Choose commit kind:",
    type: "autocomplete",
    choices: kindChoices,
  });

  if (!kind) {
    errorAndExit("Kind is required!");
  }

  const { scope } = config.scopes?.length
    ? await prompt({
      name: "scope",
      message: "Choose commit scope:",
      type: "autocomplete",
      choices: scopeChoices,
    })
    : { scope: undefined };

  const { description } = await prompt({
    name: "description",
    message: "Enter commit description:",
    type: "text",
  });

  if (!description) {
    errorAndExit("Description is required!");
  }

  const hasUnadded = await haveUnaddedChanges();
  if (hasUnadded) {
    const { addAll } = await prompt({
      name: "addAll",
      message: "You have unadded changes. Do you want to add all changes?",
      type: "confirm",
    });
    add = addAll;
  }

  const selectedKind = config.kinds.find(k => k.name === kind);
  const commitMessage = generateCommitMessage({ kind, scope, description, emoji: selectedKind?.emoji });
  if (add) {
    task("git add -A", async ({ setTitle }) => {
      setTitle("git add -A");
      await execa("git", ["add", "-A"]);
    });
  }
  task("git commit", async ({ setTitle }) => {
    setTitle("git commit");
    await execa("git", ["commit", "-m", commitMessage], { stdio: "ignore" });
  });
};
