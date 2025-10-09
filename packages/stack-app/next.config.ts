import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@choto/ui"],
  output: "standalone",
};

export default nextConfig;
