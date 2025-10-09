import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const standaloneDir = path.join(
  rootDir,
  ".next",
  "standalone",
  "packages",
  "stack-app"
);
const staticDir = path.join(rootDir, ".next", "static");
const publicDir = path.join(rootDir, "public");

function copyRecursive(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    return;
  }
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    for (const item of fs.readdirSync(src)) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      copyRecursive(srcPath, destPath);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  console.log("🚀 Building standalone output...");

  // clean up old dist
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // copy standalone
  console.log("📁 Copying .next/standalone → dist/");
  copyRecursive(standaloneDir, distDir);

  // copy .next/static
  console.log("📦 Copying .next/static → dist/.next/static");
  copyRecursive(staticDir, path.join(distDir, ".next", "static"));

  // copy public
  console.log("🌍 Copying public → dist/public");
  copyRecursive(publicDir, path.join(distDir, "public"));

  console.log("✅ Done! All files copied to dist/");
}

main();
