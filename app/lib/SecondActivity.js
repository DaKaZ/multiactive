Ti.API.debug("-------------------------  SECOND ACTIVITY -------------------------");

var win = Ti.UI.currentWindow;
var intent = Ti.Android.currentActivity.intent;

function openModal() {
  Alloy.createController('modal', {
        msg: intent.getStringExtra("message")
    }).getView().open();
}

if (typeof Alloy === 'undefined' || typeof Backbone === 'undefined' || typeof Alloy.Globals === 'undefined') {
  Ti.API.debug("-------------------------  NO ALLOY -------------------------");
  if (typeof Alloy === 'undefined') {
      var Alloy = require('alloy');
  }
  if (typeof Backbone === 'undefined') {
      var Backbone = require('alloy/backbone');
  }
  if (typeof _ === 'undefined') {
      var _ = require('alloy/underscore')._;
  }
  try {
    Ti.API.debug('Calling app.run()');
    require('app').run();
  } catch (err) {
    Ti.API.debug('Calling app._restart()');
    Ti.App._restart();
  }
  setTimeout(openModal, 1000);
} else {
  openModal();
}
