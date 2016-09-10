const {dialog} = require('electron').remote,
      fs = require('fs');

window.addEventListener('beforeunload', function (event) {
  window.onbeforeunload = confirmClose();
});

function confirmClose(event) {
  var confirm;
  
  if (document.getElementById('splashscreenlogo')) {
    return;
  }
  
  confirm = dialog.showMessageBox({
    type: 'question',
    title: 'Confirm',
    buttons: ['Yes', 'No', 'Cancel'],
    message: 'Would you like to save before closing?'
  });
  
  if (confirm === 0) {
    saveGlyphrProjectFile();
  }
  if (confirm === 2) {
    event.preventDefault;
  }
}

saveFile = function(fname, buffer, ftype) {
  ftype = ftype || 'text/plain;charset=utf-8';
  var fblob = new Blob([buffer], {'type':ftype, 'endings':'native'});
  
  console.log(fname);
  console.log(fname.includes('SVG'));
  
  if (fname.includes('SVG') || ftype == 'font/opentype') {
    console.log('SVG or OTF');
    var link = document.createElement('a');
    window.URL = window.URL || window.webkitURL;
    link.href = window.URL.createObjectURL(fblob);
    //link.onclick = ("alert("+window.URL.createObjectURL(fblob)+");");
    link.download = fname;

    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, false);
    link.dispatchEvent(event);
    return;
  }
  else {
    console.log('Glyphr Project File');
    destination = dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: 'Choose where to save project...',
      defaultPath: process.env.HOME
    }); 
    if (destination !== undefined) {
      fs.writeFile(destination + '/' + fname, buffer);
    }
    else {
      event.returnValue('Stay Open');
    }
  }
};