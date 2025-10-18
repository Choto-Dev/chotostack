"use server";

import {
  packageNameWithoutScopeErrors,
  scopeNameErrors,
} from "@choto/stack-utils";
import type { TCreateProjectSchema } from "@/lib/schemas";

const validProjectName = async (data: TCreateProjectSchema) => {
  const packageErrors = packageNameWithoutScopeErrors(data.projectName);
  const scopeErrors = scopeNameErrors(`@${data.workspaceName}`);

  return {
    packageErrors,
    scopeErrors,
  };
};

export default validProjectName;
