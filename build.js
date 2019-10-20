const fs = require('fs')
const glyphrPath = 'node_modules/Glyphr-Studio/dev/Glyphr_Studio.html'
const glyphrElectron = 'node_modules/Glyphr-Studio/dev/Glyphr_Studio_Electron.html'
const rendererJs = '<script>require(\'../../../renderer.js\')</script></body>'
const rendererCss = 'href="Glyphr_Studio.css" />\n<link rel="stylesheet" type="text/css" href="../../../renderer.css" />'
const html = fs.readFileSync(glyphrPath, 'utf8')

fs.readFile(glyphrElectron, 'utf8', (err, data) => {
  if (err) {
    generateGlyphrElectron()
  } else {
    data = data
      .replace(rendererJs, '</body>')
      .replace(rendererCss, 'href="Glyphr_Studio.css" />')
    if (data !== html) {
      generateGlyphrElectron()
    }
  }
})

function generateGlyphrElectron () {
  const htmlWithRenderer = html
    // add renderer.js
    .replace('</body>', rendererJs)

    // add renderer.css
    .replace('href="Glyphr_Studio.css" />', rendererCss)

  console.log('Building Glyphr_Studio_Electron.html...')
  fs.writeFileSync(glyphrElectron, htmlWithRenderer)
}
