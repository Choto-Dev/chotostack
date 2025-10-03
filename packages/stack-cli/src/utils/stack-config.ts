import fs from "node:fs/promises";
import path from "node:path";
import {
  type TTemplateNamespace,
  type TTemplateOption,
  templates,
} from "../auto-gen/templates";

type TChotostackConfig = {
  workspace: string;
  packages: Record<TTemplateNamespace, string>;
};

/**
 * Define ChotoStack config object.
 * @param config ChotoStack config object.
 * @returns Config object.
 */
function defineChotostackConfig(config: TChotostackConfig) {
  return config;
}

/**
 * Add package namespace in ChotoStack config.
 * @param namespace Namespace of package.
 * @param rootDir chotostack.json file directory.
 */
async function addPackageChotostackConfig(
  namespace: TTemplateNamespace,
  rootDir: string = process.cwd()
) {
  const configFileDir = path.join(rootDir, "chotostack.json");
  const configFile = await fs.readFile(configFileDir, "utf-8");

  const config: TChotostackConfig = JSON.parse(configFile);

  config.packages[namespace] = namespace;

  await fs.writeFile(configFileDir, JSON.stringify(config, null, 2), "utf-8");
}

/**
 * Remove package namespace in ChotoStack config.
 * @param namespace Namespace of package.
 */
async function removePackageFromChotostackConfig(
  namespace: TTemplateNamespace
) {
  const configFileDir = path.join(process.cwd(), "chotostack.json");
  const configFile = await fs.readFile(configFileDir, "utf-8");

  const config: TChotostackConfig = JSON.parse(configFile);

  delete config.packages[namespace];

  await fs.writeFile(configFileDir, JSON.stringify(config, null, 2), "utf-8");
}

/**
 * List of templates in the project.
 * @returns Template list with name as label and namespace as value.
 */
async function installedPackagesInChotostackConfig(): Promise<
  TTemplateOption[]
> {
  const configFileDir = path.join(process.cwd(), "chotostack.json");
  const configFile = await fs.readFile(configFileDir, "utf-8");

  const config: TChotostackConfig = JSON.parse(configFile);

  return templates.filter((t) =>
    Object.keys(config.packages).includes(t.value)
  );
}

export {
  type TChotostackConfig,
  defineChotostackConfig,
  addPackageChotostackConfig,
  removePackageFromChotostackConfig,
  installedPackagesInChotostackConfig,
};
