import nextra from 'nextra'
import { redirects } from './redirects.mjs'

const withNextra = nextra({
  latex: true,
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx'
})

export default withNextra({
  redirects
})
