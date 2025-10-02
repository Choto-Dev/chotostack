import fs from "node:fs/promises";
import path from "node:path";
import { type TTemplateNamespace, templates } from "../auto-gen/templates";

type TChotostackConfig = {
  workspace: string;
  packages: Record<TTemplateNamespace, string>;
};

function defineChotostackConfig(config: TChotostackConfig) {
  return config;
}

async function addPackageChotostackConfig(namespace: TTemplateNamespace) {
  const configFileDir = path.join(process.cwd(), "chotostack.json");
  const configFile = await fs.readFile(configFileDir, "utf-8");

  const config: TChotostackConfig = JSON.parse(configFile);

  config.packages[namespace] = namespace;

  await fs.writeFile(configFileDir, JSON.stringify(config, null, 2), "utf-8");
}

async function removePackageFromChotostackConfig(
  namespace: TTemplateNamespace
) {
  const configFileDir = path.join(process.cwd(), "chotostack.json");
  const configFile = await fs.readFile(configFileDir, "utf-8");

  const config: TChotostackConfig = JSON.parse(configFile);

  delete config.packages[namespace];

  await fs.writeFile(configFileDir, JSON.stringify(config, null, 2), "utf-8");
}

async function installedPackagesInChotostackConfig() {
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
