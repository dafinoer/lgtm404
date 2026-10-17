# lgtm404

A Telegram bot built with [grammY](https://grammy.dev) and TypeScript.

## Description

lgtm404 is a general-purpose tool built for personal assistant use. It may be released publicly in the future. The project emphasizes a modular structure and environment-based configuration.

## Specification

| Component | Details |
| --- | --- |
| Language | TypeScript |
| Runtime | Node.js |
| Bot framework | grammY `^1.46.0` |
| Emoji plugin | `@grammyjs/emoji` `^1.2.0` |
| Environment | `dotenv` `^18.0.8` |
| Build | `tsc` (output to `dist/`) |
| Dev runner | `tsx watch` |
| Module system | CommonJS (`"type": "commonjs"`) |
| TS target | ES2022 |

### Requirements

- Node.js 20 or newer
- npm
- A bot token from [@BotFather](https://t.me/BotFather)

### Environment configuration

Copy `.env.example` to `.env`, then fill in the token:

```env
BOT_TOKEN=123456:ABC-DEF...
NODE_ENV=development
```

| Variable | Required | Description |
| --- | --- | --- |
| `BOT_TOKEN` | Yes | Telegram bot token from @BotFather |
| `NODE_ENV` | No | Application mode (`development`/`production`) |

If `BOT_TOKEN` is empty, the application fails to start with `BOT_TOKEN is not defined`.

### Scripts

```bash
npm run dev        # run in watch mode
npm run build      # compile TypeScript to dist/
npm start          # run the build output
npm run typecheck  # type-check without emitting
```

### Project structure

```
src/
├── config/
│   └── EnvConfig.ts      # environment reading and validation
├── core/
│   └── Bot.ts            # grammY setup, middleware, module registration
├── modules/
│   └── start/
│       └── StartModule.ts # /start command handler
├── share/
│   └── Emoji.ts          # emoji name constants
└── main.ts               # entry point
```

### Getting started

```bash
npm install
cp .env.example .env   # fill in BOT_TOKEN
npm run dev
```

## Features

- **`/start` command** — replies with a greeting using the Telegram username, or `User` when no username is available.
- **Name-based emoji** — emoji are used by name such as `waving_hand` through `ctx.replyWithEmoji`, keeping text readable and maintainable.
- **Environment configuration** — the token and application mode are read from `.env` and validated at startup.
- **Modular architecture** — each feature lives in its own module (`src/modules/<name>`) and is registered by `Bot`.
- **Type safety** — TypeScript strict mode, including `noUncheckedIndexedAccess`.
- **Watch mode** — `npm run dev` automatically restarts when files change.
