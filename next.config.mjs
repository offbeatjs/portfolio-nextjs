/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Skip ESLint during production builds (vercel and local `next build`)
		ignoreDuringBuilds: true,
	},
    experimental: {
    optimizeCss: false
  }
};

export default nextConfig;
