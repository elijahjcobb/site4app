# site4app

[site4.app](https://site4.app)

## Commands

`npm i -g pnpm` - install [pnpm](https://pnpm.io/)

`pnpm i` - install all dependencies

`pnpm dev` - run dev server on [localhost:3000](http://localhost:3000)

`pnpm test` - run all test files `*.test.(ts | tsx)` with [jest](https://jestjs.io/)

`pnpm build` - make a production build

`pnpm start` - run a production build

`pnpm types` - create TS definitions for tables in the database from [supabase](https://supabase.com/)

## Environment Variables

> Run the following commands from your projects root directory.

1. Install vercel-cli: `pnpm i -g vercel`
2. Login to vercel: `vercel login`
3. Link project: `vercel link`
4. Pull env vars into file: `vercel env pull .env.local`
