import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { packageJson } from "../utils/package-json";
import { gitInit, pnpmInstall } from "../utils/run";
import { addPackageChotostackConfig } from "../utils/stack-config";
import { downloadTemplateWithoutMsg } from "../utils/template-operations";

type TAppTemplate = "base-template" | "basic-next-app" | "next-supabase";

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
    label: "Basic Next App",
    value: "basic-next-app",
  },
  {
    label: "Next App with Supabase",
    value: "next-supabase",
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

    if (options.install) {
      await pnpmInstall(projectPath);
    }

    if (options.git) {
      await gitInit(projectPath);
    }
  });

async function createApp(downloadDir: string, templateName: TAppTemplate) {
  await downloadTemplateWithoutMsg(downloadDir, "base");

  if (templateName === "basic-next-app") {
    await downloadTemplateWithoutMsg(
      path.join(downloadDir, "apps/nextjs-app"),
      "apps/nextjs-app"
    ).then(
      async () =>
        await addPackageChotostackConfig("apps/nextjs-app", downloadDir)
    );

    await downloadTemplateWithoutMsg(
      path.join(downloadDir, "packages/nextjs-shadcn-ui"),
      "packages/nextjs-shadcn-ui"
    ).then(
      async () =>
        await addPackageChotostackConfig(
          "packages/nextjs-shadcn-ui",
          downloadDir
        )
    );
  }
}
