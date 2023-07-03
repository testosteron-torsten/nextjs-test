/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
}


const { withSecureHeaders } = require('next-secure-headers');
const secureHeadersConfig = require('./secure-headers.config.js');

module.exports = withSecureHeaders(secureHeadersConfig)
