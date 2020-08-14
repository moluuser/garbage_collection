ca.init();
var to_register = ca.id('to_register');
to_register.addEventListener('tap', function() {
	ca.newInterface({
		url: 'register.html',
		id: 'register'
	});
});

var to_findpwd = ca.id('to_findpwd');
to_findpwd.addEventListener('tap', function() {
	ca.newInterface({
		url: 'findpwd.html',
		id: 'findpwd'
	});
});

var input = ca.tagName('input');
var btn_login = ca.id('btn_login');
btn_login.addEventListener('tap', function() {
	var uname = input['0'].value;
	var pwd = input['1'].value;

	if (uname == '') {
		ca.prompt('请输入用户名！');
		return;
	} else if (pwd == '') {
		ca.prompt('请输入密码！');
		return;
	}

	ca.get({
		url: request_url + '/User/login',
		data: {
			username: uname,
			password: pwd,
		},
		succFn: function(data) {
			if (data > 0) {
				ca.prompt('登陆成功！');
				localStorage.setItem('login_user', uname);

				var arr = ['me.html'];
				ca.sendNotice(arr, 'update', {});

				ca.getStartInterface(function(obj) {
					obj.show();
				});
			} else {
				ca.prompt('用户名或密码错误！');
			}

		}
	})
});
