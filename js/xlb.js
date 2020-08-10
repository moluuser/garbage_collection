ca.init();
var to_order = ca.id('to_order');
var login_user = localStorage.getItem('login_user');
to_order.addEventListener('tap', function() {
	if (login_user) {
		ca.newInterface({
			url: 'go.html',
			id: 'go'
		});
	} else {
		ca.newInterface({
			url: 'login.html',
			id: 'login'
		});
	}
});
