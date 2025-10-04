import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { type TTemplateNamespace, templates } from "../auto-gen/templates.js";
import { packageJson } from "../utils/package-json";
import { addPackageChotostackConfig } from "../utils/stack-config.js";
import { downloadTemplate } from "../utils/template-operations.js";

export const addCommand = new Command();
let downloadTemplateDir = "";
let templateNamespace = "";

const templatesOption = templates.filter(
  (app) =>
    app.value.includes("/") &&
    !app.value.includes("new-package") &&
    !app.value.includes("typescript")
);

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

      downloadTemplateDir = path.resolve(
        path.join(process.cwd(), templateNamespace)
      );
    }

    await addPackages();
  });

async function addPackages() {
  await downloadTemplate(
    downloadTemplateDir,
    templateNamespace as TTemplateNamespace
  ).then(async () => {
    await addPackageChotostackConfig(templateNamespace as TTemplateNamespace);
  });
}
