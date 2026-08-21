import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // Pin the workspace root — sibling lockfiles otherwise confuse inference.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
