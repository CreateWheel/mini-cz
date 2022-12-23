# mini-cz

[![NPM version](https://img.shields.io/npm/v/mini-cz?color=a1b858&label=)](https://www.npmjs.com/package/mini-cz)

## 🤘 Description

Mini-cz is a tiny commitizen alternative.

## 💎 Features

- Commitizen alternative, but much smaller
- Supports commit types
- Supports commit scopes
- Extensible configuration

## 📦 Installation

```bash
$ npm install mini-cz -D
$ yarn add mini-cz -D
$ pnpm install mini-cz -D

# install default config; or you can use your own config
$ npm install @mini-cz/config-default -D
$ yarn add @mini-cz/config-default -D
$ pnpm install @mini-cz/config-default -D
```

## 🚀 Usage

First create a `mini-cz.config.ts` in your workspace root.

```ts
// mini-cz.config.ts
export { default } from "@mini-cz/config-default";
```

Then add a script to your `package.json`:

```json
{
  "scripts": {
    "commit": "mini-cz"
  }
}
```

Finally, run `npm run commit`, `yarn commit` or `pnpm commit` to start the commit process.

## 📖 Documentation

### Configuration

You can configure `mini-cz` by creating a `mini-cz.config.ts` file in your workspace root.

```ts
// mini-cz.config.ts
import { defineConfig } from "mini-cz";

export default defineConfig({
  // This is @mini-cz/config-default
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
      description: "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
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
      description: "Changes that do not modify src or test files. Such as updating build tasks, package manager configs, etc.",
      emoji: "🤖",
    },
  ],
  // And you can add some scope
  scopes: [
    "core",
    "config-default",
  ],
});
```

## 📝 License

[MIT](./LICENSE). Made with ❤️ by [Ray](https://github.com/so1ve)