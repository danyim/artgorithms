const withImages = require("next-images");

module.exports = withImages({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  compiler: {
    styledComponents: true,
  },
});
