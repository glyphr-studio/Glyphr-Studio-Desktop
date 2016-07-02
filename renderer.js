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

saveFile = function(fname, buffer) {
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
};