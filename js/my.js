ca.init();
var login_user = localStorage.getItem('login_user')
var my_uname = ca.id('my_uname');
var my_img = ca.id('my_img');
var my_tel = ca.id('my_tel');

var myuname = ca.id('myuname');
var myimg = ca.id('myimg');
var mytel = ca.id('mytel');

myname.addEventListener('tap', function() {
	ca.prompt('用户名不允许修改！');
});

mytel.addEventListener('tap', function() {
	ca.newInterface({
		url: 'changetel.html',
		id: 'changetel'
	});
});

myimg.addEventListener('tap', function() {
	var arr = ['拍照', '相册'];
	ca.actionSheet(arr, {
		succFn: function(data) {
			if (data) {
				// console.log(server_host + data);
				var myid = localStorage.getItem('login_id');
				var new_avatar = server_host + data;
				// ca.prompt('上传成功！');
				// 修改服务器头像
				ca.get({
					url: request_url + '/User/updUserAvaById',
					data: {
						uid: myid,
						avatar: new_avatar,
					},
					succFn: function(data) {
						if (data) {
							my_img.src = new_avatar;
							ca.prompt('修改头像成功！');

							var arr = ['me.html'];
							ca.sendNotice(arr, 'update', {});

						} else {
							ca.prompt('修改头像失败！');
						}
					}
				})
			} else {
				ca.prompt('您还没有选择头像！');
			}
		},
		isUpload: true,
		uploadUrl: upload_url,

	});
});

ca.receiveNotice('update', function() {
	get_user();
});

get_user();

function get_user() {
	ca.get({
		url: request_url + '/User/getUserByName',
		data: {
			username: login_user
		},
		succFn: function(data) {
			if (data) {
				var json = JSON.parse(data);
				my_uname.innerHTML = json.username;
				if (json.avatar) {
					my_img.src = json.avatar;
				}
				if (json.tel) {
					my_tel.innerHTML = json.tel;
				}
			} else {
				ca.prompt('未获取到数据！');
			}
		}
	})
}
