module.exports = {
  // IMPORTANT:
  // `next dev` and `next build` both write into `distDir`.
  // When running a build while the dev server is running, they can stomp on each other.
  // We allow overriding the build output directory so we can run "isolated" builds.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  basePath: '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  swcMinify: true,
  transpilePackages: [
    '@ionic/react',
    '@ionic/core',
    '@stencil/core',
    'ionicons',
  ],
};
