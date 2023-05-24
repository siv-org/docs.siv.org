const fs = require('fs')
const path = require('path')

// Set the directory you want to start with
const startDirectory = './pages' // set this to your start directory

const getFilesInDirectory = (dir) => {
  let results = []
  let list = fs.readdirSync(dir)

  list.forEach((file) => {
    file = path.join(dir, file)

    let stat = fs.statSync(file)

    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(getFilesInDirectory(file))
    } else {
      /* Is a file */
      if (path.extname(file) === '.mdx') {
        results.push(file)
      }
    }
  })

  return results
}

const checkFileExists = (filePath) => {
  // Next.js uses the file path (without extension) as the page path.
  // We need to add .mdx extension for checking if the file exists.
  return fs.existsSync(filePath + '.mdx')
}

const parseMarkdownFiles = (files) => {
  const linkRegex = /\[.*?\]\((.*?)\)/g

  for (let file of files) {
    const fileContent = fs.readFileSync(file, 'utf-8')
    let match
    while ((match = linkRegex.exec(fileContent)) !== null) {
      const relativePath = match[1]
      const filePath = path.join(startDirectory, relativePath)

      const exists = checkFileExists(filePath)
      if (!exists) {
        console.log(`Missing link found in file ${file}: ${relativePath}`)
      }
    }
  }
}

const markdownFiles = getFilesInDirectory(startDirectory)
parseMarkdownFiles(markdownFiles)
