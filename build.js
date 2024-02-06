const fs = require('fs-extra')

;(async () => {
  const glyphrElectron = 'node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html'
  const rendererJs = '<script type="module" src="../../../renderer.js"></script></body>'
  const rendererCss = 'href="Glyphr_Studio.css" />\n<link rel="stylesheet" type="text/css" href="../../../renderer.css" />'
  const html = await fs.readFile('node_modules/Glyphr-Studio/dev/Glyphr_Studio.html', 'utf8')

  if (!await fs.pathExists(glyphrElectron)) {
    // generate electron html if it doesn't exist
    await generateGlyphrElectron()
  } else {
    // only generate electron html if original has been modified
    const electronFileData = await fs.readFile(glyphrElectron, 'utf8')
    const reversedFileData = electronFileData
      .replace(rendererJs, '</body>')
      .replace(rendererCss, 'href="Glyphr_Studio.css" />')

    if (html !== reversedFileData) {
      await generateGlyphrElectron()
    }
  }

  async function generateGlyphrElectron () {
    console.log('Building Glyphr_Studio_Electron.html...')
    const htmlWithRenderer = html
      // add renderer.js
      .replace('</body>', rendererJs)

      // add renderer.css
      .replace('href="Glyphr_Studio.css" />', rendererCss)

    await fs.outputFile(glyphrElectron, htmlWithRenderer)
  }
})()
