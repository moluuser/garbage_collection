ca.init();
var input = ca.tagName('input');
var btn_findpwd = ca.id('btn_findpwd');
btn_findpwd.addEventListener('tap', function() {
	var uname = localStorage.getItem('login_user');
	var pwd = input['0'].value;
	var newpwd = input['1'].value;

	if (pwd == '') {
		ca.prompt('请输入原密码！');
		return;
	} else if (newpwd == '') {
		ca.prompt('请输入新密码！');
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
				ca.get({
					url: request_url + '/User/updUserPwdByName',
					data: {
						username: uname,
						password: newpwd,
					},
					succFn: function(data) {
						if (data > 0) {
							ca.prompt('修改成功！');
						} else {
							ca.prompt('修改失败！');
						}
					}
				})
			} else {
				ca.prompt('原密码错误！');
			}
		}
	})
});
