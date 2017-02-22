
function doClick(e) {
	Alloy.createController('modal').getView().open();
}

$.index.open();

var intent = Ti.Android.currentActivity.getIntent();
var data = intent.getData();
alert("Got data: " + data);
