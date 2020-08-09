ca.init();
var to_order = ca.id('to_order');
to_order.addEventListener('tap', function(){
	ca.newInterface({
		url:'order.html',
		id:'order'
	});
});
