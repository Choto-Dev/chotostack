import consola from "consola";
import * as giget from "giget";

type TTemplatePath = "base" | "apps/nextjs-app" | "packages/nextjs-shadcn-ui";

/**
 * Download templates files from github
 * @param projectPath Root directory of the project
 * @param templatePath Template path in github
 * @param options Different message options
 */
async function downloadTemplate(
  projectPath: string,
  templatePath: TTemplatePath,
  options?: {
    startMsg?: string;
    successMsg?: string;
    errorMsg?: string;
  }
) {
  consola.start(options?.startMsg || "Creating files...");
  await giget
    .downloadTemplate(
      `github:Choto-Dev/choto-templates/templates/${templatePath}/files`,
      {
        dir: projectPath,
      }
    )
    .then(() => {
      consola.success(options?.successMsg || "Files created successfully");
    })
    .catch((error) => {
      consola.fail(options?.errorMsg || "Failed to create files");
      consola.log("");
      consola.fail(error);
    });
}

export { downloadTemplate, type TTemplatePath };
