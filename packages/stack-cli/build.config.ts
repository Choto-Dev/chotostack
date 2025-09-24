import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    './src/index.ts',
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist/',
    },
  ],
  outDir: 'dist',
  declaration: true,
});
