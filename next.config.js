const { redirects } = require('./redirects.js')

module.exports = (async () => {
  const nextra = (await import('nextra')).default
  const withNextra = nextra({
    latex: true,
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx'
  })

  return withNextra({
    redirects
  })
})()
