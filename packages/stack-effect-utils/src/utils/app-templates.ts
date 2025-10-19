import type { TTemplateNamespace } from "../auto-gen/templates";

type TAppTemplate = "base-template" | "basic-next-app" | "next-supabase";

type TAppTemplateOptions = {
  label: string;
  value: TAppTemplate;
  description?: string;
  packages?: TTemplateNamespace[];
}[];

const appTemplateOptions: TAppTemplateOptions = [
  {
    label: "Base Template",
    value: "base-template",
    description: "Basic turbo monorepo without any apps and packages.",
    packages: [],
  },
  {
    label: "Basic Next App",
    value: "basic-next-app",
    description: "A basic Nextjs app with Shadcn/UI.",
    packages: ["apps/nextjs-app", "packages/nextjs-shadcn-ui"],
  },
  {
    label: "Next App with Supabase",
    value: "next-supabase",
    description: "A Nextjs app with Shadcn/UI and Supabase local backend.",
    packages: [
      "apps/nextjs-app",
      "packages/nextjs-shadcn-ui",
      "packages/supabase-local-docker",
    ],
  },
];

export { type TAppTemplate, type TAppTemplateOptions, appTemplateOptions };
