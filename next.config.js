/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
  },
});
