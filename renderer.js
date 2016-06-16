const {dialog} = require('electron').remote;

window.addEventListener('beforeunload', function (event) {
  window.onbeforeunload = confirmClose();
});

function confirmClose (event) {
  var confirm = dialog.showMessageBox({
    type: 'question',
    buttons: ['No', 'Yes', 'Cancel'],
    message: 'Would you like to save before closing?'
  });
  
  if (confirm === 1) {
    saveGlyphrProjectFile();
  }
  if (confirm === 2) {
    event.preventDefault;
  };
};