import DocumentLayout from 'layouts/document'
import { MDXRemote } from 'next-mdx-remote'
import { componentMap } from 'components/component-mapper'

import { getStaticProps as staticProps } from './[part]/[page].jsx'

// We're hardcoding the /intro page to also serve as this index page
export function getStaticProps() {
  return staticProps({ params: { part: 'intro' } })
}

// Copied from ./[part]/[page].jsx
export default function Page({ source, frontMatter }) {
  return (
    <DocumentLayout frontMatter={frontMatter}>
      <MDXRemote {...source} components={componentMap} />
    </DocumentLayout>
  )
}
