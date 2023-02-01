import NavBar from 'components/navbar'
import SideBar from 'components/sidebar'
import config from 'config/config.json'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

export default function GlobalLayout({ title, part, description, children }) {
  const { projectTitle, projectURL, projectDescription } = config
  const htmlTitle = part ? `${title} - ${part}` : title

  return (
    <>
      <NextSeo
        title={`${htmlTitle} | ${projectTitle}`}
        description={description ? description : projectDescription}
        openGraph={{
          type: 'website',
          url: projectURL,
          title: title,
          description: description
        }}
      />

      <Head>
        <meta
          content='width=device-width, initial-scale=1.0, maximum-scale=5.0'
          name='viewport'
        />
        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' href='/icon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/512.png' />
        <link rel='manifest' href='/manifest.json' />
      </Head>

      <header className='fixed top-0 z-40 w-screen h-10 font-medium bg-gray-200 md:shadow dark:bg-gray-800 md:h-14'>
        <NavBar />
      </header>

      <div className='flex mt-10 content-wrapper md:mt-14 xl:container xl:mx-auto'>
        <SideBar />
        <div className='flex md-wrapper md:ml-56 xl:ml-64'>{children}</div>
      </div>
    </>
  )
}
