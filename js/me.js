ca.receiveNotice('update', function() {
	get_user();
});

var to_about = ca.id('to_about');
to_about.addEventListener('tap', function() {
	ca.newInterface({
		url: 'about.html',
		id: 'about'
	});
});

var to_fb = ca.id('to_fb');
to_fb.addEventListener('tap', function() {
	ca.newInterface({
		url: 'feedback.html',
		id: 'feedback'
	});
});

var to_orders = ca.id('to_orders');
to_orders.addEventListener('tap', function() {
	var login_user = localStorage.getItem('login_user');
	if (login_user) {
		ca.newInterface({
			url: 'order.html',
			id: 'order'
		});
	} else {
		ca.newInterface({
			url: 'login.html',
			id: 'login'
		});
	}

});

var to_setting = ca.id('to_setting');
to_setting.addEventListener('tap', function() {
	ca.newInterface({
		url: 'setting.html',
		id: 'setting'
	});
});

var to_myaddress = ca.id('to_myaddress');
to_myaddress.addEventListener('tap', function() {
	ca.newInterface({
		url: 'myaddress.html',
		id: 'myaddress'
	});
});

var to_login = ca.id('to_login');
to_login.addEventListener('tap', function() {
	ca.newInterface({
		url: 'login.html',
		id: 'login'
	});
});

var to_score = ca.id('to_score');
to_score.addEventListener('tap', function() {
	var login_user = localStorage.getItem('login_user');
	if (login_user) {
		ca.newInterface({
			url: 'score.html',
			id: 'score'
		});
	} else {
		ca.newInterface({
			url: 'login.html',
			id: 'login'
		});
	}
});

var to_go = ca.id('to_go');
to_go.addEventListener('tap', function() {
	ca.newInterface({
		url: 'go.html',
		id: 'go'
	});
});

var to_my = ca.id('to_my');
to_my.addEventListener('tap', function() {
	ca.newInterface({
		url: 'my.html',
		id: 'my'
	});
});

var login_succ = ca.className('login-succ');
var login_after = ca.className('login-after');

get_user();

function get_user() {
	var login_user = localStorage.getItem('login_user');
	ca.get({
		url: request_url + '/User/getUserByName',
		data: {
			username: login_user
		},
		succFn: function(data) {
			if (data) {
				var json = JSON.parse(data);
				localStorage.setItem('login_id', json.uid);
				login_after['0'].style.display = "none";
				login_succ['0'].style.display = "block";
				login_after['1'].style.display = "none";
				login_succ['1'].style.display = "block";
				login_succ['1'].innerHTML = json.username;
				if (json.avatar) {
					login_succ['0'].src = json.avatar;
				}
			} else {
				login_after['0'].style.display = "block";
				login_succ['0'].style.display = "none";
				login_after['1'].style.display = "block";
				login_succ['1'].style.display = "none";
			}
		}
	})
}

var get_score = ca.id('get_score');
get_score.addEventListener('tap', function() {
	var login_id = localStorage.getItem('login_id');
	if (login_id) {
		ca.get({
			url: request_url + '/User/updUserScoreById',
			data: {
				uid: login_id,
				changevar: 5
			},
			succFn: function(data) {
				if (data > 0) {
					// 写入积分日志
					ca.get({
						url: request_url + '/Scorelog/addScorelog',
						data: {
							uid: login_id,
							delta: 5,
							detail: '每日签到'
						},
						succFn: function(data) {

						}
					})
					ca.prompt('签到成功！获得5积分！');
				} else if (data == -1) {
					ca.prompt('您今天已经签过到啦，明天再来吧！');
				} else {
					ca.prompt('签到失败！');
				}
			}
		})
	} else {
		ca.newInterface({
			url: 'login.html',
			id: 'login'
		});
	}
});
