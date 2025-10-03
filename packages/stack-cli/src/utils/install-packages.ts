import { exec } from "node:child_process";
import { promisify } from "node:util";
import consola from "consola";

const execAsync = promisify(exec);

async function pnpmInstall(rootDir: string = process.cwd()) {
  const { stdout, stderr } = await execAsync(
    `cd ${rootDir} && pnpm i && pnpm lint`
  );
  consola.log(stdout);
  consola.error(stderr);
}

export { pnpmInstall };
