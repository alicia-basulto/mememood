
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
};

const withPWA = nextPWA({
  dest: "public",
});


export default withPWA(
  nextConfig
);
