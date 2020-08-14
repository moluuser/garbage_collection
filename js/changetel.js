ca.init();
var input = ca.tagName('input');
var btn_changetel = ca.id('btn_changetel');
btn_changetel.addEventListener('tap', function() {
	var login_id = localStorage.getItem('login_id');
	var newtel = input['0'].value;

	if (newtel == '') {
		ca.prompt('手机号码不能为空！');
		return;
	} else if (newtel.length != 11) {
		ca.prompt('手机号码格式错误！');
		return;
	}

	ca.get({
		url: request_url + '/User/updUserTelById',
		data: {
			uid: login_id,
			tel: newtel,
		},
		succFn: function(data) {
			if (data > 0) {
				ca.prompt('修改成功！');
				var arr = ['my'];
				ca.sendNotice(arr, 'update', {});

			} else {
				ca.prompt('修改失败！');
			}
		}
	})
});
