import path from "node:path";
import {
  addPackageChotostackConfig,
  appTemplateOptions,
  downloadTemplateWithoutMsg,
  type TTemplateNamespace,
} from "@choto/stack-utils";
import { Command } from "commander";
import { consola } from "consola";
import { packageJson } from "../utils/package-json";
import { gitInit, pnpmInstall } from "../utils/run";

export const createCommand = new Command();
let projectPath = "";
let installPackages: TTemplateNamespace[] = [];

createCommand
  .name("create")
  .description("Create a new project")
  .version(packageJson.version, "-v, --version")
  .argument("[project-name]", "Project Name")
  .option("-n, --name [name]", "Project Name")
  .option("--no-install [install]", "Install node module packages")
  .option("--no-git [git]", "Initiate git")
  .action(async (projectNameArg, options) => {
    if (!options.name && projectNameArg === undefined) {
      const projectName = await consola.prompt("Project Name", {
        type: "text",
      });

      projectPath = path.join(process.cwd(), projectName);
    }

    if (typeof projectNameArg === "string") {
      projectPath = path.resolve(path.join(process.cwd(), projectNameArg));
    }

    if (projectNameArg === undefined && typeof options.name === "string") {
      projectPath = path.join(process.cwd(), options.name);
    }

    const selectedOption = await consola.prompt("Select a template", {
      type: "select",
      options: appTemplateOptions,
    });

    installPackages =
      appTemplateOptions.find((option) => option.value === selectedOption)
        ?.packages || [];

    consola.start(
      `Creating project with ${appTemplateOptions.find((option) => option.value === selectedOption)?.label} template...`
    );
    await createApp(projectPath)
      .then(() => {
        consola.success("Project is created!");
      })
      .catch((error) => {
        consola.error(error);
      });

    if (options.install) {
      await pnpmInstall(projectPath);
    }

    if (options.git) {
      await gitInit(projectPath);
    }
  });

async function createApp(downloadDir: string) {
  await downloadTemplateWithoutMsg(downloadDir, "base");

  for (const pkg of installPackages) {
    await downloadTemplateWithoutMsg(path.join(downloadDir, pkg), pkg).then(
      async () => await addPackageChotostackConfig(pkg, downloadDir)
    );
  }
}
