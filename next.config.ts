import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.seadn.io',
            },
        ],
    },
    devIndicators: false,
};

export default nextConfig;
