import InPageToc from 'components/in-page-toc'
import PageNav from 'components/page-nav'
import Text from 'components/text'
import GlobalLayout from 'layouts/global'
import { useEffect, useState } from 'react'

export default function DocumentLayout({ children, frontMatter }) {
  const showToc = !frontMatter.hide_toc && frontMatter.tocRaw.length > 0
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const [locale, setLocale] = useState('en')
  const { title, part, description, tags, updated, tocRaw } = frontMatter

  useEffect(() => {
    const browserLocales =
      navigator.languages === undefined
        ? [navigator.language]
        : navigator.languages
    if (browserLocales[0] !== undefined) {
      setLocale(browserLocales[0])
    }
  }, [])

  return (
    <GlobalLayout title={title} part={part} description={description}>
      <div className='flex content-container'>
        <div className='w-screen max-w-screen-sm px-4 content md:px-8 md:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-lg'>
          {part && <h4 className='mt-6 text-sky-900/70'>{part}</h4>}
          {title && (
            <h1 className={`${part ? 'my-2' : 'my-5'} text-4xl font-bold`}>
              {title}
            </h1>
          )}
          {description && <p className='my-1'>{description}</p>}
          {tags && (
            <div className='my-2 text-sm 2xl:text-base'>
              <span>
                <Text tid='Tags' />:
              </span>
              {tags.map((tag) => (
                <span
                  className='p-1 m-1 text-xs bg-gray-300 rounded dark:bg-gray-700'
                  key={tag}
                >
                  {`#${tag}`}
                </span>
              ))}
            </div>
          )}

          <div className='md-content'>{children}</div>
          <hr className='mx-1 my-3 border-gray-300 print:hidden dark:border-gray-600' />
          {updated && (
            <div className='text-xs text-center'>
              <Text tid='Last Update' />:{' '}
              {new Date(updated).toLocaleDateString(
                locale || 'en',
                dateOptions
              )}
            </div>
          )}
          <PageNav />
        </div>
        {showToc && (
          <div className='flex-none hidden w-56 toc-container lg:block'>
            <div className='sticky toc top-20'>
              <InPageToc tocRaw={tocRaw} />
            </div>
          </div>
        )}
      </div>
    </GlobalLayout>
  )
}
