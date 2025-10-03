import { exec } from "node:child_process";
import { promisify } from "node:util";
import consola from "consola";

const execAsync = promisify(exec);

async function gitInit(rootDir: string = process.cwd()) {
  const { stdout, stderr } = await execAsync(
    `cd ${rootDir} && git init && git add . && git commit -m "initiate chotostack project"`
  );
  consola.log(stdout);
  consola.log(stderr);
}

export { gitInit };
