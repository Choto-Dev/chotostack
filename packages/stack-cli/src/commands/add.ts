import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import {
  downloadTemplate,
  type TTemplatePath,
} from "../utils/download-template.js";
import { packageJson } from "../utils/package-json";

type TApps = {
  label: string;
  value: TTemplatePath;
}[];

export const addCommand = new Command();
let projectPath = "";
let templateNamespace = "";

const allTemplatesOption: TApps = [
  {
    label: "Nextjs App",
    value: "apps/nextjs-app",
  },
  {
    label: "Nextjs Shadcn UI",
    value: "packages/nextjs-shadcn-ui",
  },
];

addCommand
  .name("add")
  .description("Add apps and feature packages")
  .version(packageJson.version, "-v, --version")
  .argument("[path]", "App or package path")
  .action(async (appPath, _options) => {
    if (!appPath) {
      templateNamespace = await consola.prompt("Select an app to download", {
        type: "select",
        options: allTemplatesOption,
      });

      projectPath = path.resolve(path.join(process.cwd(), templateNamespace));
    }

    // consola.log(projectPath);
    await downloadTemplate(projectPath, templateNamespace as TTemplatePath);
  });
