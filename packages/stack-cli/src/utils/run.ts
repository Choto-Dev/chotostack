import { type ChildProcess, spawn } from "node:child_process";
import consola from "consola";
import kill from "tree-kill";

const activeProcesses = new Set<ChildProcess>();

/**
 * Run commands
 * @param cmd Command
 * @param args Command arguments
 * @param rootDir Command spawn directory
 * @returns Void promise
 */
function run(
  cmd: string,
  args: string[] = [],
  rootDir: string = process.cwd()
) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn(cmd, args, {
      cwd: rootDir,
      shell: true,
      stdio: "inherit",
    });

    activeProcesses.add(proc);

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error("$cmdfailed with code $code"));
      }
    });

    proc.on("error", (err) => {
      activeProcesses.delete(proc);
      reject(err);
    });
  });
}

const killAll = (signal: NodeJS.Signals = "SIGTERM") => {
  for (const proc of activeProcesses) {
    if (proc.pid) {
      kill(proc.pid, signal);
    }
  }
  activeProcesses.clear();
  process.exit();
};

process.on("SIGINT", killAll);
process.on("SIGTERM", killAll);
process.on("exit", killAll);

/**
 * Run `pnpm i` and `pnpm lint`
 * @param rootDir Working directory
 */
async function pnpmInstall(rootDir: string = process.cwd()) {
  try {
    await run("pnpm", ["i"], rootDir);
    await run("pnpm", ["lint"], rootDir);
  } catch (error) {
    consola.error("❌", error);
  }
}

/**
 * Initiate, add and commit git.
 * @param rootDir Working directory
 */
async function gitInit(rootDir: string = process.cwd()) {
  try {
    await run("git", ["init"], rootDir);
    await run("git", ["add", "."], rootDir);
    await run(
      "git",
      ["commit", "-m", `"initiate chotostack project"`],
      rootDir
    );
  } catch (error) {
    consola.error("❌", error);
  }
}

export { pnpmInstall, gitInit };
