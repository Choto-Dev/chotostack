"use server";

import { existsSync } from "node:fs";
import path from "node:path";

export default async function isValidProjectDir() {
  const isChotostackExist = existsSync(path.resolve("chotostack.json"));

  return isChotostackExist;
}
