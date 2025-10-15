import { builtinModules } from "node:module";

/**
 * List of errors in the package name.
 * @param packageName Name of package.
 * @returns Array of errors in the packageName.
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <"">
function packageNameErrors(packageName: string) {
  const errors: string[] = [];

  // If `packageName` is a falsy value.
  if (!packageName) {
    errors.push("Package name cannot be empty.");
  }

  // If `packageName` contain capital letters.
  if (/[A-Z]/.test(packageName)) {
    errors.push("Package name must be lowercase.");
  }

  // If `packageName` contain spaces.
  if (/\s/.test(packageName)) {
    errors.push("Package name cannot contain spaces.");
  }

  // If `packageName` starts with `@`, else otherwise.
  if (packageName.startsWith("@")) {
    const parts = packageName.split("/");

    if (parts.length !== 2) {
      errors.push("Scoped package names must be in the format @scope/name.");
    }

    const [scope, pkg] = parts;

    // scope must start with @ and have at least one valid character.
    if (scope && !/^@[a-z0-9-*~][a-z0-9-*._~]*$/.test(scope)) {
      errors.push(
        "Invalid scope name. Scope must start with @ followed by lowercase letters, numbers, hyphens (-), dots (.), underscores (_), asterisks (*), or tildes (~)."
      );
    }

    // validate package name after scope.
    if (pkg && !/^[a-z0-9-._~]+$/.test(pkg)) {
      errors.push(
        "Invalid package name within scope. It may only contain lowercase letters, numbers, hyphens (-), dots (.), underscores (_), or tildes (~)."
      );
    }
  } else {
    // validate `packageName` without any scope.
    if (!/^[a-z0-9-~][a-z0-9-._~]*$/.test(packageName)) {
      errors.push(
        "Invalid unscoped package name. It must start with a lowercase letter, number, or tilde (~), and may include hyphens, dots, or underscores."
      );
    }

    // `packageName` is a builtin module.
    if (builtinModules.includes(packageName)) {
      errors.push(`${packageName} is core module.`);
    }
  }

  return errors;
}

/**
 * Validate the whole package name.
 * @param packageName Name of package.
 * @returns true if the package name matches with pattern, false otherwise.
 */
function validatePackageName(packageName: string) {
  const pattern =
    /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/;
  return pattern.test(packageName);
}

export { packageNameErrors, validatePackageName };
