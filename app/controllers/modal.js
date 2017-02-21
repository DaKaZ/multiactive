var args = $.args;


$.modal.add(Ti.UI.createLabel({
  text: args.msg || 'No Message',
  top: 50
}));

function doClose(){
  $.modal.close();
}
