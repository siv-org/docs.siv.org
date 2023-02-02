import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SideBarItem from './sidebar-item'
import { AngleDown, AngleRight } from './svg-icons'

const SideBarSection = ({ toc }) => {
  const [menuVisible, setMenuVisible] = useState(true)
  const { asPath: path } = useRouter()
  const chapterItems = (
    <>
      {toc.chapters?.map((item, id) => (
        <SideBarItem item={item} key={id} />
      ))}
    </>
  )

  const toggleMenu = () => {
    setMenuVisible((current) => !current)
  }

  // Open part containing current page
  useEffect(() => {
    const currentPart = toc.chapters.some((chapter) => chapter.path === path)
    if (currentPart) {
      setMenuVisible(true)
    }
  }, [path, toc.chapters])

  return (
    <div className='text-sm'>
      {/* display toggleable titlebar only when we have a part */}
      {toc.part && (
        <div className='flex items-center my-3 ml-1.5' onClick={toggleMenu}>
          <div>{menuVisible ? <AngleDown /> : <AngleRight />}</div>
          <div className='pl-1 text-base text-gray-900 cursor-pointer select-none dark:text-gray-50'>
            {toc.part}
          </div>
        </div>
      )}

      {toc.part ? (
        <div className={menuVisible ? 'block ml-4 pl-1' : 'hidden'}>
          {chapterItems}
        </div>
      ) : (
        <div>{chapterItems}</div>
      )}
    </div>
  )
}

export default SideBarSection
