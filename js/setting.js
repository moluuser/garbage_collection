ca.init();
var to_pact = ca.id('to_pact');
to_pact.addEventListener('tap', function() {
	ca.newInterface({
		url: 'pact.html',
		id: 'pact'
	});
});
var to_my = ca.id('to_my');
to_my.addEventListener('tap', function() {
	if (login_user) {
		ca.newInterface({
			url: 'my.html',
			id: 'my'
		});
	} else {
		ca.prompt('您还没有登录！');
	}
});

var to_findpwd = ca.id('to_findpwd');
to_findpwd.addEventListener('tap', function() {
	if (login_user) {
		ca.newInterface({
			url: 'changepwd.html',
			id: 'changepwd'
		});
	} else {
		ca.prompt('您还没有登录！');
	}
});
var loginout = ca.id('loginout');
var login_user = localStorage.getItem('login_user');
//退出登录
loginout.addEventListener('tap', function() {
	if (login_user) {
		ca.closeCurrentInterface();
		localStorage.removeItem('login_user');
		localStorage.removeItem('login_id');
		localStorage.removeItem('hometype');
		localStorage.removeItem('hometime');
		localStorage.removeItem('detail');
		localStorage.removeItem('contactname');
		localStorage.removeItem('contacttel');
		localStorage.removeItem('homeaddress');
		localStorage.removeItem('detailaddress');
		localStorage.removeItem('goodstype');
		localStorage.removeItem('goodsname');
		localStorage.removeItem('goodsnum');
		localStorage.removeItem('price');
		localStorage.removeItem('oid');
		localStorage.removeItem('aid');
		var arr = ['me.html'];
		ca.sendNotice(arr, 'update', {});

		ca.closeCurrentInterface();
		//底部导航初始化
		ca.tabBarInit(true, '');
		ca.prompt('退出成功！');
	} else {
		ca.prompt('您还没有登录！');
	}
});
