const {dialog} = require('electron').remote,
      fs = require('fs');

window.addEventListener('beforeunload', function(event) {
  window.onbeforeunload = confirmClose(event);
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

  // yes
  if (confirm === 0) {
    saveGlyphrProjectFile();
  }
  // cancel
  else if (confirm === 2) {
    event.returnValue = 'false';
  }
}

saveFile = function(fname, buffer, ftype) {
  var fblob = new Blob([buffer], {
        'type': ftype ? ftype : 'text/plain;charset=utf-8',
        'endings':'native'
      }),
      link,
      event,
      destination;

  if (fname.includes('SVG') || ftype === 'font/opentype') {
    link = document.createElement('a');
    window.URL = window.URL || window.webkitURL;
    link.href = window.URL.createObjectURL(fblob);
    link.download = fname;

    event = document.createEvent('MouseEvents');
    event.initEvent('click', true, false);
    link.dispatchEvent(event);
    return;
  }
  else {
    destination = dialog.showOpenDialog({
      properties: ['openDirectory'],
      title: 'Choose where to save project...',
      defaultPath: process.env.HOME
    });

    if (destination !== undefined) {
      fs.writeFile(destination + '/' + fname, buffer);
    }
    else {
      event.returnValue = 'false';
    }
  }
};
