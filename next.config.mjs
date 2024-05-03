/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
    eslint: {
        // Ignore during builds if the environment variable is set
        ignoreDuringBuilds: process.env.IGNORE_ESLINT_DURING_BUILDS === 'true',
      },
};

export default config;
