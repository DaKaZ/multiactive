$.previouslyStarted = false;

function doClick(e) {
	Alloy.createController('modal', {
        msg: Alloy.Globals.intent.getStringExtra("message")
    }).getView().open();
}

function doView(e) {
	$.previouslyStarted = true;
	var v = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor: 'blue'
	});
	$.index.add(v);
	v.addEventListener('click', function() {
		$.index.remove(v);
		v = null;
	});
}

$.index.open();

function alertIntentData(intent) {
	Ti.API.debug("----------------------------------- Got url: " + intent.getData());
	Ti.API.debug("----------------------------------- Got msg: " + intent.getStringExtra("message"));
}

Ti.Android.currentActivity.addEventListener('newintent', function(e) {
	Ti.API.debug("-----------------------------------  EVENT newintent -----------------------------------");
	Ti.API.debug("New Intent:");
	alertIntentData(e.intent);
	Ti.API.debug("Current Intent: ");
	alertIntentData(Ti.Android.currentActivity.getIntent());
	Ti.API.debug("Alloy Intent:");
	alertIntentData(Alloy.Globals.intent);
});


$.index.add(Ti.UI.createLabel({
	width: Ti.UI.SIZE,
	height: Ti.UI.SIZE,
	text: "URL: " + Alloy.Globals.intent.getData(),
	color: 'black',
	bottom: 10
}));


$.index.add(Ti.UI.createLabel({
	width: Ti.UI.SIZE,
	height: Ti.UI.SIZE,
	text: "MSG: " + Alloy.Globals.intent.getStringExtra('message'),
	color: 'black',
	bottom: 50
}));
