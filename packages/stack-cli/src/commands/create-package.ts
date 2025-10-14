import path from "node:path";
import { downloadTemplate, getWorkspaceDirectory } from "@choto/stack-utils";
import { Command } from "commander";
import { consola } from "consola";
import { packageJson } from "../utils/package-json";

export const createPackageCommand = new Command();
let packageName = "";
let packageDirectoryName = "";

createPackageCommand
  .name("create-package")
  .description("Create new package")
  .version(packageJson.version, "-v, --version")
  .argument("[package-name]", "Package Name")
  .option("-n, --name [name]", "Package Name")
  .action(async (packageNameArg, options) => {
    if (!options.name && packageNameArg === undefined) {
      packageName = await consola.prompt("Package Name", {
        type: "text",
      });
    }

    if (typeof packageNameArg === "string") {
      packageName = packageNameArg;
    }

    if (packageNameArg === undefined && typeof options.name === "string") {
      packageName = options.name;
    }

    packageDirectoryName = await consola.prompt("Package directory", {
      type: "select",
      options: await getWorkspaceDirectory(),
    });

    const namespace = `${packageDirectoryName}/${packageName}`;

    await downloadTemplate(
      path.join(process.cwd(), namespace),
      "packages/new-package"
    );
  });
