module.exports = {
  // IMPORTANT:
  // `next dev` and `next build` both write into `distDir`.
  // When running a build while the dev server is running, they can stomp on each other.
  // We allow overriding the build output directory so we can run "isolated" builds.
  // However, on Vercel we should always stick to the default `.next` folder.
  // A misconfigured `NEXT_DIST_DIR` in Vercel env vars can cause deploy finalization failures
  // after `next build` completes (builder can't find expected output).
  distDir: process.env.VERCEL ? '.next' : (process.env.NEXT_DIST_DIR || '.next'),
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
