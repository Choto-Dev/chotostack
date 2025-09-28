import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { downloadTemplate } from "../utils/download-template";
import { packageJson } from "../utils/package-json";

export const initCommand = new Command();
let projectPath = "";

initCommand
  .name("init")
  .description("Initiate a ChotoStack Project.")
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

    await downloadTemplate(projectPath, "base", {
      startMsg: "Creating base files...",
    });
  });
