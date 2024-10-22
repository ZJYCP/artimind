import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
 
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@lobehub/ui'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src')
    config.resolve.alias['@img'] = path.join(process.cwd(), 'src/assets/images')
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default withNextIntl(nextConfig)
