const fs = require('fs');

var html,
    injectScript,
    htmlPath = 'bower_components/glyphr-studio/dev/Glyphr_Studio.html',
    autoHackPath = 'bower_components/glyphr-studio/dev/Glyphr_Studio_Autohacked_For_Electron.html';

html = fs.readFileSync(htmlPath).toString();
injectScript = html.replace('<\/body>', '<script>require(\'..\/..\/..\/renderer.js\')<\/script><\/body>');
injectCss = injectScript.replace('href="Glyphr_Studio.css" \/>', 'href="Glyphr_Studio.css" />\n<link rel="stylesheet" type="text/css" href="..\/..\/..\/renderer.css" \/>');
fs.writeFileSync(autoHackPath, injectCss);