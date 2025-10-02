// import fs from "node:fs/promises";
import path from "node:path";
import { Command } from "commander";
import { consola } from "consola";
import { downloadTemplate } from "../utils/download-template";
import { packageJson } from "../utils/package-json";
// import { defineChotostackConfig } from "../utils/stack-config";

export const initCommand = new Command();
let projectPath = "";
// let workspaceName = "workspace";

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

    // workspaceName = await consola.prompt("Workspace Name", {
    //   type: "text",
    //   default: "workspace",
    // });

    consola.start("Initiate ChotoProject");
    await init().then(() => {
      consola.success("Success");
    });
  });

// Todo: initiate a choto project in existing project.
async function init() {
  await downloadTemplate(projectPath, "base", {
    startMsg: "Creating base files...",
  });

  // const pkgName = `@${workspaceName}/typescript-config`;

  // const chotostackConfig = defineChotostackConfig({
  //   workspaceName,
  //   packages: {
  //     [pkgName]: {
  //       name: "",
  //     },
  //   },
  // });

  // await fs.writeFile(
  //   path.join(projectPath, "chotostack.json"),
  //   JSON.stringify(chotostackConfig, null, 2),
  //   "utf8"
  // );
}
