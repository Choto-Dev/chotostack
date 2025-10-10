"use server";

import fs from "node:fs/promises";
import path from "node:path";

export default async function createFile() {
  console.log(path.join(process.cwd(), "dir"));
  await fs.mkdir(path.join(process.cwd(), "dir"));
}
