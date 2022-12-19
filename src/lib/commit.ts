import { exec, prompt } from "clerc/toolkit";

import type { Config } from "../types";
import { errorAndExit } from "../utils";

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

interface CommitOptions { all?: boolean }
export const commit = async (config: Config, { all = false }: CommitOptions = {}) => {
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

  const selectedKind = config.kinds.find(k => k.name === kind);
  const commitMessage = generateCommitMessage({ kind, scope, description, emoji: selectedKind?.emoji });
  if (all) {
    await exec("git", ["add", "-A"]);
  }
  await exec("git", ["commit", "-m", commitMessage], { stdio: "inherit" });
};
