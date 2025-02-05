ca.init();

ca.receiveNotice('update', function() {
	get_myaddress();
});

get_myaddress();

function get_myaddress() {
	var addresspanel = ca.id('addresspanel');
	addresspanel.innerHTML = '';
	var login_id = localStorage.getItem('login_id');
	ca.get({
		url: request_url + '/Myaddress/getMyaddressByUid',
		data: {
			uid: login_id
		},
		succFn: function(data) {
			if (data != '[]') {
				// console.log(data);
				// 遍历
				var json = JSON.parse(data);
				for (d in json) {
					var myadd = json[d].homeaddress + ' ' + json[d].detailaddress;
					var tmpl = `<div class="mui-card">
				<div class="mui-card-footer" style="color: #333;">
					<span>` + json[
							d].contactname + `</span>
					<span>` + json[d].contacttel +
						`</span>
				</div>
				<div style="position: absolute; left: 0.9375rem;">
					<p>` + myadd +
						`</p>
				</div>
				<div class="mui-card-content">
					<a class='to_editaddress' style="float: right; margin-right: 0.625rem; color: #b4d145; margin-bottom: 0.625rem;">
						<span style="margin-right: 0.625rem;" class="mui-icon mui-icon-trash delmyaddress" aid="` +
						json[d].aid + `"></span>
						<span class="mui-icon mui-icon-compose editthisaddress" aid="` +
						json[d].aid + `"></span></a>
				</div>
			</div>`;
					var addresspanel = ca.id('addresspanel');
					addresspanel.innerHTML += tmpl;

				}
				var addresspanel = ca.id('addresspanel');
				addresspanel.innerHTML += `<button id="to_addaddress" class="address-btn">新增地址</button>`;
				var to_addaddress = ca.id('to_addaddress');

				click_event();
				to_addaddress.addEventListener('tap', function() {
					ca.newInterface({
						url: 'editaddress.html',
						id: 'editaddress'
					});
				});
			} else {}
		}
	})
}

function click_event() {
	var delmyaddress = ca.className('delmyaddress');
	for (var i = 0; i < delmyaddress.length; ++i) {
		delmyaddress[i].addEventListener('tap', function() {
			// 删除
			var myaid = this.getAttribute('aid');
			// alert(myaid);
			var btnArray = ['否', '是'];
			mui.confirm('确认删除吗？', '我的地址', btnArray, function(e) {
				if (e.index == 1) {
					ca.get({
						url: request_url + '/Myaddress/delMyaddressById',
						data: {
							aid: myaid
						},
						succFn: function(data) {
							if (data) {
								var arr = ['myaddress'];
								ca.sendNotice(arr, 'update', {});
								ca.prompt('删除成功！');
							} else {
								ca.prompt('系统错误！');
							}
						}
					})
				} else {

				}
			});

		});
	}

	// 修改事件
	var editthisaddress = ca.className('editthisaddress');
	for (var i = 0; i < editthisaddress.length; ++i) {
		editthisaddress[i].addEventListener('tap', function() {
			var myaid = this.getAttribute('aid');
			// alert(myaid);
			localStorage.setItem('aid', myaid);
			ca.newInterface({
				url: 'editmyaddress.html',
				id: 'editmyaddress'
			});
		});
	}
}
