import { defineConfig } from "mini-cz";

export default defineConfig({
  kinds: [
    {
      name: "feat",
      description: "A new feature",
      emoji: "✨",
    },
    {
      name: "fix",
      description: "A bug fix",
      emoji: "🐛",
    },
    {
      name: "docs",
      description: "Documentation only changes",
      emoji: "📚",
    },
    {
      name: "style",
      description:
        "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
      emoji: "💎",
    },
    {
      name: "refactor",
      description: "A code change that neither fixes a bug nor adds a feature",
      emoji: "📦",
    },
    {
      name: "perf",
      description: "A code change that improves performance",
      emoji: "🚀",
    },
    {
      name: "test",
      description: "Adding missing tests or correcting existing tests",
      emoji: "🚨",
    },
    {
      name: "chore",
      description:
        "Changes that do not modify src or test files. Such as updating build tasks, package manager configs, etc.",
      emoji: "🤖",
    },
  ],
});
