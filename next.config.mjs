import withPWA from 'next-pwa';

const nextConfig = {
    reactStrictMode: true,
    experimental: {
    },
};

const pwaConfig = {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',

};

export default withPWA(pwaConfig)(nextConfig);
