"use server";

import path from "node:path";
import { installTemplate } from "@choto/stack-utils";
import type { TCreateProjectSchema } from "@/lib/schemas";

const createNewProject = async (data: TCreateProjectSchema) => {
  let projectPath = path.resolve(data.projectName);

  if (process.env.NODE_ENV === "development") {
    projectPath = path.resolve("../../../", data.projectName);
  }

  const { error } = await installTemplate(projectPath, "base");

  if (error && error?.length > 0) {
    return error;
  }
};

export default createNewProject;
