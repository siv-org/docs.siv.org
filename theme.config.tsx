import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const metaDescription = 'How to run a secure online election'

const config: DocsThemeConfig = {
  logo: (
    <img
      className='w-12 cursor-pointer dark:brightness-[50]'
      src='/images/logo.png'
      alt='logo'
    />
  ),
  docsRepositoryBase: 'https://github.com/dsernst/siv-docs/blob/main',
  editLink: { component: null },
  feedback: {
    useLink: () => {
      const { title } = useConfig()
      return `mailto:team@siv.org?subject=${encodeURI(
        `Feedback for: "${title}"`
      )}`
    }
  },
  footer: { text: 'Secure Internet Voting Inc.' },
  components: {
    ol: (props) => (
      <ol className='nx-list-decimal ltr:nx-ml-6 rtl:nx-mr-6' {...props} />
    )
  },
  useNextSeoProps: () => {
    const { frontMatter } = useConfig()

    return {
      titleTemplate: '%s · SIV',
      description: metaDescription,

      openGraph: {
        title: `${frontMatter.title} · SIV`,
        description: metaDescription
      }
    }
  },
  head: function useHead() {
    const { title } = useConfig()

    return (
      <>
        <meta name='msapplication-TileColor' content='#fff' />
        <meta name='theme-color' content='#fff' />
        <meta name='robots' content='index,follow' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Language' content='en' />
        <meta name='description' content={metaDescription} />
        <meta name='og:description' content={metaDescription} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site:domain' content='book.siv.org' />
        <meta name='twitter:url' content='https://book.siv.org' />
        <meta name='og:title' content={title ? title + ' · SIV' : 'SIV'} />
        <meta name='apple-mobile-web-app-title' content='SIV Book' />
      </>
    )
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
  },
  sidebar: {
    defaultMenuCollapseLevel: 1
  }
}

export default config
