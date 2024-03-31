
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

const withPWA = nextPWA({
  dest: "public",
});


export default withPWA(
  nextConfig
);
