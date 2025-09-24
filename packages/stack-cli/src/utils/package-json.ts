import pkg from "../../package.json" with { type: "json" };

/**
 * Package name, description, version and author name.
 */
const packageJson = {
  /** Package name  */
  name: pkg.name,
  /** Package description */
  description: pkg.description,
  /** Package version */
  version: pkg.version,
  /** Package author */
  author: pkg.author,
};

type TPackageJson = typeof packageJson;

export { packageJson, type TPackageJson };
