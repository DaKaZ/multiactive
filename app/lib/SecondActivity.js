Ti.API.debug("-------------------------  SECOND ACTIVITY -------------------------");

function openModal() {
  var intent = Ti.Android.currentActivity.intent;
  Alloy.createController('modal', {
        msg: intent.getStringExtra("message")
    }).getView().open();
}

if (typeof Alloy === 'undefined' || typeof Backbone === 'undefined' || typeof _ === 'undefined') {
  Ti.API.debug("-------------------------  NO ALLOY -------------------------");
  var Alloy=require("alloy"),_=Alloy._,Backbone=Alloy.Backbone;Alloy.createController("index");

  setTimeout(openModal, 1000);
} else {
  openModal();
}
