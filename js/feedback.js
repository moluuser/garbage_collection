ca.init();
var feed_btn = ca.id('feed_btn');
var login_user = localStorage.getItem('login_user');
if (!login_user) {
	login_user = '未登录';
}
feed_btn.addEventListener('tap', function() {
	var fmsg = ca.id('feed-msg').value;
	var ftel = ca.id('feed-tel').value;
	if (fmsg == '') {
		ca.prompt('您未填写意见！');
		return;
	} else {
		ca.get({
			url: request_url + '/Feed/addFeed',
			data: {
				username: login_user,
				msg: fmsg,
				tel: ftel
			},
			succFn: function(data) {
				if (data > 0) {
					ca.prompt('提交成功！感谢您的意见！');
				} else {
					ca.prompt('提交失败！');
				}
			}
		})
	}
});
