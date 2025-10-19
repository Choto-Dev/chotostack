import { builtinModules } from "node:module";

/**
 * List of errors in the package name.
 * @param packageName Name of package.
 * @returns Array of errors in the packageName.
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <"">
function packageNameWithScopeErrors(packageName: string) {
  const errors: string[] = [];

  // If `packageName` is empty.
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
    if (pkg) {
      if (!/^[a-z0-9-._~]+$/.test(pkg)) {
        errors.push(
          "Invalid package name within scope. It may only contain lowercase letters, numbers, hyphens (-), dots (.), underscores (_), or tildes (~)."
        );
      }
    } else {
      errors.push("Package name can not be empty.");
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
function validatePackageNameWithScope(packageName: string) {
  return /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/.test(
    packageName
  );
}

/**
 * List of errors in the scope name.
 * @param scopeName Name of scope.
 * @returns Array of errors in the scope name.
 */
function scopeNameErrors(scopeName: string) {
  const errors: string[] = [];

  // If `scopeName` is empty.
  if (!scopeName) {
    errors.push("Scope name cannot be empty.");
  }

  // If `scopeName` contain capital letters.
  if (/[A-Z]/.test(scopeName)) {
    errors.push("Scope name must be lowercase.");
  }

  // If `scopeName` contain spaces.
  if (/\s/.test(scopeName)) {
    errors.push("Scope name cannot contain spaces.");
  }

  // If `scopeName` does not start with "@" character
  if (!scopeName.startsWith("@")) {
    errors.push('Scope name must start with "@".');
  }

  // If `scopeName` does not start with "@" character
  if (scopeName.startsWith("@") && scopeName.length < 2) {
    errors.push('"@" can not be only character.');
  }

  if (!/^@[a-z0-9-*~][a-z0-9-*._~]*$/.test(scopeName)) {
    errors.push("No special character except -");
  }

  return errors;
}

/**
 * Validate scope name.
 * @param scopeName Name of scope.
 * @returns `true` for valid scope name, `false` otherwise.
 */
function validateScopeName(scopeName: string) {
  // `scopeName` can not be empty.
  if (!scopeName) {
    return false;
  }

  return /^@[a-z0-9-*~][a-z0-9-*._~]*$/.test(scopeName);
}

/**
 * List of errors in the package name.
 * @param scopeName Name of package.
 * @returns Array of errors in the package name.
 */
function packageNameWithoutScopeErrors(packageName: string) {
  const errors: string[] = [];

  // If `packageName` is empty.
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

  // If `packageName` is a builtin module.
  if (builtinModules.includes(packageName)) {
    errors.push(`${packageName} is core module.`);
  }

  if (!/^[a-z0-9-~][a-z0-9-._~]*$/.test(packageName)) {
    errors.push("No special character except -");
  }

  return errors;
}

/**
 * Validate package name.
 * @param packageName Name of package.
 * @returns `true` for valid package name, `false` otherwise.
 */
function validatePackageNameWithoutScope(packageName: string) {
  // `packageName` can not be empty.
  if (!packageName) {
    return false;
  }

  // `packageName` is a builtin module.
  if (builtinModules.includes(packageName)) {
    return false;
  }

  return /^[a-z0-9-~][a-z0-9-._~]*$/.test(packageName);
}

export {
  packageNameWithScopeErrors,
  packageNameWithoutScopeErrors,
  scopeNameErrors,
  validatePackageNameWithScope,
  validatePackageNameWithoutScope,
  validateScopeName,
};
