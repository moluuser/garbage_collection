var to_type1 = ca.id('to_type1');
var to_type2 = ca.id('to_type2');
to_type1.addEventListener('tap', function() {
	ca.newInterface({
		url: 'type1.html',
		id: 'type1'
	});
});
to_type2.addEventListener('tap', function() {
	ca.newInterface({
		url: 'type2.html',
		id: 'type2'
	});
});
