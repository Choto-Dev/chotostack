# `@choto/typescript-config`

Config files for typescript `tsconfig.json`.

### Setup

Edit the following files in the nextjs project to set the package.

Update `package.json` file

```json filename=package.json
{
  // ...
  "devDependencies": {
    // ...
    "@choto/typescript-config": "workspace:*",
    // ...
  }
}
```

Update `tsconfig.json` file

```json filename=tsconfig.json
{
  "extends": "@choto/typescript-config/nextjs",
  // ...
}
```

Install the dependancies

```bash
pnpm i
```

### Exports

- `@choto/typescript-config/base`: Base TypeScript config file.
- `@choto/typescript-config/nextjs`: TypeScript config for nextjs.
- `@choto/typescript-config/react-library`: TypeScript config for react based package.