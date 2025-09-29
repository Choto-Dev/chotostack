import path from "node:path";
import { downloadTemplateWithoutMsg } from "./download-template";

async function createApp(projectPath: string, templateName: string) {
  await downloadTemplateWithoutMsg(projectPath, "base");

  if (templateName === "basic") {
    downloadTemplateWithoutMsg(
      path.join(projectPath, "apps/nextjs-app"),
      "apps/nextjs-app"
    );
    downloadTemplateWithoutMsg(
      path.join(projectPath, "packages/nextjs-shadcn-ui"),
      "packages/nextjs-shadcn-ui"
    );
  }
}

export { createApp };
