import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { createApp } from "../utils/create-app";
import { packageJson } from "../utils/package-json";

type TAppTemplateOptions = {
  label: string;
  value: string;
}[];

const appTemplateOptions: TAppTemplateOptions = [
  {
    label: "Basic",
    value: "basic",
  },
];

export const createCommand = new Command();
let projectPath = "";

createCommand
  .name("create")
  .description("Create a new project")
  .version(packageJson.version, "-v, --version")
  .argument("[project-name]", "Project Name")
  .option("-n, --name [name]", "Project Name")
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

    consola.start("Creating project...");
    await createApp(projectPath, selectedOption)
      .then(() => {
        consola.success("Project is created!");
      })
      .catch((error) => {
        consola.error(error);
      });
  });
