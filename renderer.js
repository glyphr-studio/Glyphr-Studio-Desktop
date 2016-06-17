const {dialog} = require('electron').remote;

window.addEventListener('beforeunload', function (event) {
  window.onbeforeunload = confirmClose();
});

function confirmClose (event) {
  var confirm;
  
  if (document.getElementById('splashscreenlogo')) {
    return;
  }
  
  confirm = dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'No', 'Cancel'],
    message: 'Would you like to save before closing?'
  });
  
  if (confirm === 0) {
    saveGlyphrProjectFile();
  }
  if (confirm === 2) {
    event.preventDefault;
  };
};