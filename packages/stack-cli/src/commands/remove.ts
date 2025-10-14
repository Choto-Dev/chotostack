import {
  deleteTemplate,
  installedPackagesInChotostackConfig,
  removePackageFromChotostackConfig,
  type TTemplateNamespace,
} from "@choto/stack-utils";
import { Command } from "commander";
import { consola } from "consola";
import { packageJson } from "../utils/package-json";

// import type { TTemplateNamespace } from "../auto-gen/templates.js";
// import {
//   installedPackagesInChotostackConfig,
//   removePackageFromChotostackConfig,
// } from "../utils/stack-config.js";
// import { deleteTemplate } from "../utils/template-operations.js";

export const removeCommand = new Command();
let templateNamespace = "";

removeCommand
  .name("remove")
  .description("Remove apps and feature packages")
  .version(packageJson.version, "-v, --version")
  .argument("[path]", "App or package path")
  .action(async (appPath, _options) => {
    if (!appPath) {
      const installerTemplatesOption =
        await installedPackagesInChotostackConfig();

      templateNamespace = await consola.prompt("Select an app to download", {
        type: "select",
        options: installerTemplatesOption,
      });
    }

    consola.start("Removing package...");
    await removePackages().then(() => {
      consola.success("Package removed.");
    });
  });

async function removePackages() {
  await deleteTemplate(templateNamespace as TTemplateNamespace).then(
    async () => {
      await removePackageFromChotostackConfig(
        templateNamespace as TTemplateNamespace
      );
    }
  );
}
