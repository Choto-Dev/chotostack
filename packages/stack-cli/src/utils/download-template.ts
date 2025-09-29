import fs from "node:fs/promises";
import consola from "consola";
import * as giget from "giget";
import type { TTemplateNamespace } from "../auto-gen/templates";

/**
 * Download templates files from github.
 * @param downloadDir Directory to download
 * @param namespace Template namespace in github
 * @param options Different message options
 */
async function downloadTemplate(
  downloadDir: string,
  namespace: TTemplateNamespace,
  options?: {
    startMsg?: string;
    successMsg?: string;
    errorMsg?: string;
  }
) {
  consola.start(options?.startMsg || "Creating files...");
  await giget
    .downloadTemplate(
      `github:Choto-Dev/choto-templates/templates/${namespace}/files`,
      {
        dir: downloadDir,
      }
    )
    .then(async ({ dir }) => {
      const entries = await fs.readdir(dir);
      if (entries.length === 0) {
        consola.error(options?.errorMsg || "Failed to create files");
        await fs.rm(dir, { recursive: true });
        return;
      }
      consola.success(options?.successMsg || "Files created successfully");
    })
    .catch((error) => {
      consola.fail(options?.errorMsg || "Failed to create files");
      consola.log("");
      consola.fail(error);
    });
}

/**
 * Download templates files from github without any messages.
 * @param downloadDir Directory to download
 * @param namespace Template namespace in github
 */
async function downloadTemplateWithoutMsg(
  downloadDir: string,
  namespace: TTemplateNamespace
) {
  await giget
    .downloadTemplate(
      `github:Choto-Dev/choto-templates/templates/${namespace}/files`,
      {
        dir: downloadDir,
      }
    )
    .then(async ({ dir }) => {
      const entries = await fs.readdir(dir);
      if (entries.length === 0) {
        consola.error("Failed to create files");
        await fs.rm(dir, { recursive: true });
        return;
      }
    });
}

export { downloadTemplate, downloadTemplateWithoutMsg };
