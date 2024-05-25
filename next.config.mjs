import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer =
  typeof bundleAnalyzer === "function"
    ? bundleAnalyzer
    : bundleAnalyzer.default;

const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  output: "standalone",
  reactStrictMode: true,
};

export default bundleAnalyzerConfig(nextConfig);
