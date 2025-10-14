"use server";

import fs from "node:fs/promises";
import path from "node:path";

export default async function createNewProject(
  projectName: string,
  workspaceName: string
) {
  let projectPath = path.resolve(projectName);

  if (process.env.NODE_ENV === "development") {
    projectPath = path.resolve("../../../", projectName);
  }
  console.log(projectPath, workspaceName);

  await fs.mkdir(projectPath);
}
