import type { NextConfig } from "next";

// basePath only when building for GitHub Pages (CI), so local dev/preview stays at "/".
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "pedro-portfolio";

const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // exposed to the client so we can prefix /public image srcs (next/image with
  // unoptimized does NOT add basePath to them automatically)
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(isPages ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
