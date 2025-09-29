import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { type TTemplateNamespace, templates } from "../auto-gen/templates.js";
import { downloadTemplate } from "../utils/download-template.js";
import { packageJson } from "../utils/package-json";

export const addCommand = new Command();
let projectPath = "";
let templateNamespace = "";

const templatesOption = templates.filter((app) => app.value.includes("/"));

addCommand
  .name("add")
  .description("Add apps and feature packages")
  .version(packageJson.version, "-v, --version")
  .argument("[path]", "App or package path")
  .action(async (appPath, _options) => {
    if (!appPath) {
      templateNamespace = await consola.prompt("Select an app to download", {
        type: "select",
        options: templatesOption,
      });

      projectPath = path.resolve(path.join(process.cwd(), templateNamespace));
    }

    await downloadTemplate(
      projectPath,
      templateNamespace as TTemplateNamespace
    );
  });
