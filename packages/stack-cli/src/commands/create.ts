import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { downloadTemplateWithoutMsg } from "../utils/download-template";
import { packageJson } from "../utils/package-json";

type TAppTemplate = "base-template" | "basic-app";

type TAppTemplateOptions = {
  label: string;
  value: TAppTemplate;
}[];

const appTemplateOptions: TAppTemplateOptions = [
  {
    label: "Base Template",
    value: "base-template",
  },
  {
    label: "Basic App",
    value: "basic-app",
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

    consola.start(
      `Creating project with ${appTemplateOptions.find((option) => option.value === selectedOption)?.label} template...`
    );
    await createApp(projectPath, selectedOption)
      .then(() => {
        consola.success("Project is created!");
      })
      .catch((error) => {
        consola.error(error);
      });
  });

async function createApp(downloadDir: string, templateName: TAppTemplate) {
  await downloadTemplateWithoutMsg(downloadDir, "base");

  if (templateName === "basic-app") {
    await downloadTemplateWithoutMsg(
      path.join(downloadDir, "apps/nextjs-app"),
      "apps/nextjs-app"
    );
    await downloadTemplateWithoutMsg(
      path.join(downloadDir, "packages/nextjs-shadcn-ui"),
      "packages/nextjs-shadcn-ui"
    );
  }
}
