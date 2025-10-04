import fs from "node:fs/promises";
import path from "node:path";
import yaml from "yaml";

type WorkspaceConfig = {
  packages?: string[];
  [key: string]: unknown;
};

async function getWorkspaceDirectory() {
  const fileContent = await fs.readFile(
    path.join(process.cwd(), "pnpm-workspace.yaml"),
    "utf8"
  );

  const data = yaml.parse(fileContent) as WorkspaceConfig;

  const packages = data?.packages ?? [];

  const result = packages.map((pkg) => {
    const name = pkg.split("/")[0]!.replace("*", "");
    return {
      label: name,
      value: name,
    };
  });

  return result;
}

export { getWorkspaceDirectory };
