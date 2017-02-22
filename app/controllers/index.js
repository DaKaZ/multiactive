
function doClick(e) {
	Alloy.createController('modal').getView().open();
}

$.index.open();

function alertIntentData(intent) {
	Ti.API.debug("----------------------------------- Got data: " + intent.getData());
	Ti.API.debug("----------------------------------- Got msg: " + intent.getStringExtra("message"));
}

Ti.Android.currentActivity.addEventListener('newintent', function(e) {
	Ti.API.debug("New Intent event fired");
	alertIntentData(e.intent);
});

var startIntent = Ti.Android.currentActivity.getIntent();
alertIntentData(startIntent);
