import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.seadn.io',
            },
            {
                protocol: 'https',
                hostname: 'moonrunnerscommunity.github.io',
            },
        ],
    },
    devIndicators: false,
};

export default nextConfig;
