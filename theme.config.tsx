import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <img
      className='w-12 cursor-pointer dark:brightness-[50]'
      src='/images/logo.png'
      alt='logo'
    />
  ),
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
  },
  useNextSeoProps: () => {
    const { frontMatter } = useConfig()

    return {
      titleTemplate: '%s · SIV',
      description: 'How to run a secure online election',

      openGraph: {
        title: `${frontMatter.title} · SIV`,
        description: 'How to run a secure online election'
      }
    }
  },
  main: (props) => {
    const config = useConfig()
    return (
      <>
        {config.title && (
          <h1 className='my-2 mb-4 text-3xl font-bold'>{config.title}</h1>
        )}
        <main {...props} />
      </>
    )
  }
}

export default config
