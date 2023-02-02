import SideBarContext from 'components/store/sidebar-context'
import config from 'config/config.json'
import Link from 'next/link'
import { useContext, useEffect, useRef } from 'react'
import { useClickAway, useMedia } from 'react-use'
import SideBarSection from './sidebar-section'

function SideBar() {
  const { toc, projectTitle } = config
  const sideBarCtx = useContext(SideBarContext)
  const isWide = useMedia('(min-width: 770px)', false)
  const ref = useRef(null)

  useEffect(() => {
    if (isWide) {
      sideBarCtx.hideSideBar()
    }
  }, [isWide, sideBarCtx])

  useClickAway(ref, () => {
    if (!isWide) {
      sideBarCtx.hideSideBar()
    }
  })

  const sideBarStyle = sideBarCtx.sideBar
    ? 'sidebar w-2/3 z-50 h-screen bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-800 fixed pl-4 text-lg top-10 md:hidden'
    : 'sidebar z-50 flex-none md:w-56 xl:w-64 h-screen fixed top-10 md:top-14 hidden md:block'

  return (
    <aside className={sideBarStyle} ref={ref}>
      <div className='w-full h-full px-1 pb-40 overflow-y-auto md:pb-16'>
        <div className='flex flex-col md:mt-10'>
          <Link href='/'>
            <a aria-label={projectTitle}>
              <div className='flex flex-col items-center'>
                {process.env.NEXT_PUBLIC_USE_LOGO && (
                  <img
                    src={`/${process.env.NEXT_PUBLIC_USE_LOGO}`}
                    alt={projectTitle}
                    className='hidden w-24 md:inline-block'
                  />
                )}
                <span
                  className='self-start hidden px-4 font-semibold md:inline-block '
                  title={projectTitle}
                >
                  {projectTitle}
                </span>
              </div>
            </a>
          </Link>
          <div className='pl-2 mt-6 leading-loose tracking-wide'>
            {toc.map((toc, id) => (
              <SideBarSection toc={toc} key={id} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
