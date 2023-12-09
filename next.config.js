const withNextra = require('nextra')({
  latex: true,
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

module.exports = withNextra({
  async redirects() {
    return [
      {
        source: '/verifiability/proving-confirmation',
        destination: '/verifiability/proving-verification',
        permanent: true
      }
    ]
  }
})
