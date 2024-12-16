import bundleAnalyzer from "@next/bundle-analyzer";

// Use bundleAnalyzer only if it's available, otherwise fallback to its default export
const withBundleAnalyzer =
  typeof bundleAnalyzer === "function"
    ? bundleAnalyzer
    : bundleAnalyzer.default;

// Configuration for enabling bundle analyzer based on environment variable
const bundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true", // Enables the bundle analyzer when ANALYZE environment variable is "true"
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Allows images from this protocol
        hostname: "platform-lookaside.fbsbx.com", // Allow images from this Facebook domain
        pathname: "/**", // Matches all paths under this domain
      },
      {
        protocol: "https", // Allows images from Googleusercontent domain
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    // Enable top-level await as part of Webpack experiments
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  output: "standalone", // Ensures the app is self-contained (useful for serverless environments)
  reactStrictMode: true, // Enables React's strict mode to highlight potential issues during development
};

export default bundleAnalyzerConfig(nextConfig);
