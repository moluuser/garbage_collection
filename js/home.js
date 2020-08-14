var to_msg = ca.id('to_msg');
to_msg.addEventListener('tap', function() {
	ca.newInterface({
		url: 'msg.html',
		id: 'msg'
	});
});

var imgs = ca.className('imgs');

get_imgs();

function get_imgs() {
	ca.get({
		url: request_url + '/App/getAppInfo',
		data: {

		},
		succFn: function(data) {
			if (data) {
				var json = JSON.parse(data);
				imgs['0'].src = json['index1'];
				imgs['1'].src = json['index2'];
				imgs['2'].src = json['index3'];
				imgs['3'].src = json['index4'];
			} else {
				ca.prompt('首页图片获取失败！');
			}
		}
	})
}

// 搜索事件,获取搜索关键词
function enterSearch(event) {
	if (event.keyCode == 13) { //用户点击回车的事件号为13
		var keyword = document.getElementById('searchInput').value;
		mui.toast('暂时没有找到"' + keyword + '"，快点击右下角闪电下单把！', {
			duration: 'long',
			type: 'div'
		})
	}
}
