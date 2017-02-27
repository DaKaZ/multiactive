Ti.API.debug("-------------------------  SECOND ACTIVITY -------------------------");
var intent = Ti.Android.currentActivity.intent;

function alertIntentData(intent) {
	Ti.API.debug("----------------------------------- Got url (2): " + intent.getData());
	Ti.API.debug("----------------------------------- Got msg (2): " + intent.getStringExtra("message"));
}


function openModal() {
  Alloy.createController('modal', {
        msg: intent.getStringExtra("message")
    }).getView().open();
}

if (typeof Alloy === 'undefined' || typeof Backbone === 'undefined' || typeof _ === 'undefined') {
  Ti.API.debug("-------------------------  NO ALLOY -------------------------");
  var Alloy=require("alloy"),_=Alloy._,Backbone=Alloy.Backbone;Alloy.createController("index");
  Ti.API.debug("Start Intent (2): ");
  alertIntentData(intent);
  Ti.API.debug("Alloy Intent (2):");
  alertIntentData(Alloy.Globals.intent);
  setTimeout(openModal, 1000);
} else {
  Ti.API.debug("Start Intent (2): ");
  alertIntentData(intent);
  Ti.API.debug("Alloy Intent (2):");
  alertIntentData(Alloy.Globals.intent);
  openModal();
}
