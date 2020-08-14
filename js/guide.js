// 显示回收指南
get_msg();

function get_msg() {
	ca.get({
		url: request_url + '/App/getAppInfo',
		data: {

		},
		succFn: function(data) {
			if (data) {
				var json = JSON.parse(data);
				var guide_msg = json['guide_msg'];
				var guide_box = ca.id('guidetext');
				guide_box.innerHTML = guide_msg;

			} else {
				ca.prompt('回收指南获取失败！');
			}
		}
	})
}
