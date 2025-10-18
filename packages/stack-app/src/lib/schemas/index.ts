import { z } from "@choto/stack-utils/zod";

const schemas = {
  createProject: z.object({
    projectName: z.string(),
    workspaceName: z.string(),
  }),
};

export type TCreateProjectSchema = z.infer<typeof schemas.createProject>;
export { schemas };
