ca.init();
var to_pact = ca.id('to_pact');
to_pact.addEventListener('tap', function() {
	ca.newInterface({
		url: 'pact.html',
		id: 'pact'
	});
});

var input = ca.tagName('input');
var btn_reg = ca.id('btn_reg');
btn_reg.addEventListener('tap', function() {
	var uname = input['0'].value;
	var pwd = input['1'].value;
	var repwd = input['2'].value;
	var pact = $('input[name="radio1"]:checked').val();

	if (uname == '') {
		ca.prompt('请输入用户名！');
		return;
	} else if (pwd == '') {
		ca.prompt('请输入密码！');
		return;
	} else if (repwd == '') {
		ca.prompt('请输入确认密码！');
		return;
	} else if (pwd != repwd) {
		ca.prompt('两次密码不一致！');
		return;
	} else if (pact != 'on') {
		ca.prompt('请同意用户协议！');
		return;
	}


	ca.get({
		url: request_url + '/User/getUserByName',
		data: {
			username: uname,
		},
		succFn: function(data) {
			if (data != 0) {
				ca.prompt('用户名已存在！');
				return;
			} else {
				ca.get({
					url: request_url + '/User/addUser',
					data: {
						username: uname,
						password: pwd,
					},
					succFn: function(data) {
						if (data != 0) {
							ca.prompt('注册成功！');
							ca.getStartInterface(function(obj) {
								obj.show();
							});
						} else {
							ca.prompt('注册失败！');
						}
					}
				})
			}
		}
	})
});
