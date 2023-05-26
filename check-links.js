const fs = require('fs')
const path = require('path')

let brokenRelativeLinksCount = 0
let brokenAbsoluteLinksCount = 0
let brokenExternalLinksCount = 0
let brokenFragmentLinksCount = 0
let linksChecked = 0

/** Build a list recursively of all the mdx files */
const getFilesInDirectory = (dir) => {
  let results = []
  let list = fs.readdirSync(dir)

  list.forEach((file) => {
    file = path.join(dir, file)

    let stat = fs.statSync(file)

    if (stat?.isDirectory()) {
      results = results.concat(getFilesInDirectory(file))
    } else {
      if (path.extname(file) === '.mdx') {
        results.push(file)
      }
    }
  })

  return results
}

const checkFileExists = (filePath) => {
  // if filePath starts with /images, prefix with publicDirectory
  if (filePath.startsWith('/images')) filePath = path.join('./public', filePath)

  return fs.existsSync(filePath)
}

const externalLinkCache = {}
const checkExternalLink = async (url, fileName) => {
  // No need to check the same link multiple times
  if (externalLinkCache[url]) return
  externalLinkCache[url] = true

  function fail(statuscode) {
    console.log(
      `❌🌐 Broken link (${
        statuscode || 'Unknown status code'
      }) found in file ${fileName}: ${url}`
    )
    brokenExternalLinksCount++
  }
  try {
    // console.log(`Checking external link: ${url}`)
    const response = await fetch(url)
    if (!response.ok) fail(response.status)
  } catch (err) {
    fail()
  }
}

const checkUrlFragment = (filePath, fragment, originalLink, file) => {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const headers = fileContent.match(/^#+\s+.+$/gm)
  const formattedFragment = fragment
    .toLowerCase()
    .replace(/[^a-z0-9\- ]+/g, '') // remove non alphanumeric, non-hyphen, non-space characters
    .replace(/[\s]+/g, '-') // replace spaces with hyphen
  const exists = headers.some((header) => {
    const formattedHeader = header
      .replace(/^#+\s+/g, '') // remove the leading hashes and space
      .toLowerCase()
      .replace(/[^a-z0-9\- ]+/g, '') // remove non alphanumeric, non-hyphen, non-space characters
      .replace(/[\s]+/g, '-') // replace spaces with hyphen
    return formattedHeader === formattedFragment
  })
  if (!exists) {
    console.log(`❌⚓ broken fragment found in file ${file}: ${originalLink}`)
    brokenFragmentLinksCount++
  }
}

const runCheck = async () => {
  const startDirectory = './pages'
  const files = getFilesInDirectory(startDirectory)

  console.log('Found ' + files.length + ' mdx files to review...\n')

  const linkRegex = /\[.*?\]\((.*?)\)/g

  await Promise.all(
    files.map(async (file) => {
      const fileContent = fs.readFileSync(file, 'utf-8')
      let match
      while ((match = linkRegex.exec(fileContent)) !== null) {
        const link = match[1]
        linksChecked++
        const [urlWithoutFragment, fragment] = link.split('#')

        // Skip mailto links
        if (urlWithoutFragment.startsWith('mailto:')) continue

        // Is it an external link?
        if (
          urlWithoutFragment.startsWith('http://') ||
          urlWithoutFragment.startsWith('https://')
        ) {
          await checkExternalLink(urlWithoutFragment, file)
          continue
        }

        const filePath = path.join(startDirectory, urlWithoutFragment) + '.mdx'

        const exists = checkFileExists(filePath)
        if (!exists) {
          console.log(
            `❌ broken inline link found in file ${file}: ${link} -- ${filePath}`
          )
          if (link.startsWith('/')) brokenAbsoluteLinksCount++
          else brokenRelativeLinksCount++
        } else if (fragment) {
          checkUrlFragment(filePath, fragment, link, file)
        }
      }
    })
  )

  // Summarize results
  console.log(
    `🟦 Links checked: ${linksChecked}.\n\n Broken links: ${
      brokenRelativeLinksCount +
      brokenAbsoluteLinksCount +
      brokenExternalLinksCount +
      brokenFragmentLinksCount
    }, relative: ${brokenRelativeLinksCount}, absolute: ${brokenAbsoluteLinksCount}, external: ${brokenExternalLinksCount}, fragment: ${brokenFragmentLinksCount}`
  )

  process.exit()
}

runCheck()
