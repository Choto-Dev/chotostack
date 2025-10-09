# `@choto/ui`

UI Design System.

### Setup

Edit the following files in the nextjs project to set the package.

1. Update `next.config.ts` file.

```ts filename=next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@choto/ui'],
};

export default nextConfig;

```

2. Update `package.json` file.

```json filename=package.json
{
  // ...
  "devDependencies": {
    // ...
    "@choto/ui": "workspace:*",
    // ...
  }
}
```

3. Update `postcss.config.mjs` file.

```js filename=postcss.config.mjs
// biome-ignore lint/performance/noBarrelFile: <"allow standard practice">
export { default } from '@choto/ui/postcss.config';
```

4. Update `tsconfig.json` file.

```json filename=tsconfig.json
{
  //...
  "compilerOptions": {
    // ...
    "paths": {
      // ...
      "@choto/ui/*": ["../../packages/ui/src/*"]
    },
    // ...
  },
  // ...
}
```

5. Install the dependancies to link with the package.

```bash
pnpm i
```