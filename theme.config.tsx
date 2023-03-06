import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>SIV</span>,
  project: {
    link: 'https://github.com/dsernst/siv-book'
  },
  docsRepositoryBase: 'https://github.com/dsernst/siv-book',
  footer: {
    text: 'Secure Internet Voting Inc.'
  },
  components: {
    ol: (props) => (
      <ol className='nx-list-decimal ltr:nx-ml-6 rtl:nx-mr-6' {...props} />
    )
  }
}

export default config
