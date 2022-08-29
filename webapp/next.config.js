/**
 * @type {import('next').NextConfig}
 */
 const nextConfig = {
    experimental: {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: '**',
            },
          ],
        },
      },
}
  
module.exports = nextConfig