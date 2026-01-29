/** @type {import('next').NextConfig} */
const nextConfig = {
  // 字体文件不要走压缩，避免 Edge 解码失败
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "Content-Encoding", value: "identity" },
        ],
      },
    ];
  },

  // 优化 barrel imports (bundle-barrel-imports)
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
