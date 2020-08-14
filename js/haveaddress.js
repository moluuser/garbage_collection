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
					var tmpl =
						`<div class="mui-card" style="height: 85px">
				<div class="mui-card-footer" style="color: #333;">
					<span>` +
						json[
							d].contactname + `</span>
					<span>` + json[d].contacttel +
						`</span>
				</div>
				<div style="position: absolute; left: 0.9375rem;">
					<p>` + myadd +
						`</p>
				</div>
				<div class="mui-card-content">
					<a class='to_editaddress' style="float: right; margin-right: 1rem; ">
						<button aid="` +
						json[d].aid +
						`" type="button" class="mui-btn mui-btn-royal useaddress">使用</button> 
						</a>
				</div>
			</div>`;
					var addresspanel = ca.id('addresspanel');
					addresspanel.innerHTML += tmpl;
				}
				click_event();
			} else {}
		}
	})
}

function click_event() {
	// 使用事件
	var useaddress = ca.className('useaddress');
	for (var i = 0; i < useaddress.length; ++i) {
		useaddress[i].addEventListener('tap', function() {
			var myaid = this.getAttribute('aid');
			// alert(myaid);
			ca.get({
				url: request_url + '/Myaddress/getMyaddressById',
				data: {
					aid: myaid
				},
				succFn: function(data) {
					var json = JSON.parse(data);
					if (data) {
						localStorage.setItem('contactname', json.contactname);
						localStorage.setItem('contacttel', json.contacttel);
						localStorage.setItem('homeaddress', json.homeaddress);
						localStorage.setItem('detailaddress', json.detailaddress);

						var arr = ['address'];
						ca.sendNotice(arr, 'update', {});
						ca.closeCurrentInterface();
					} else {
						ca.prompt('获取错误！');
					}
				}
			})

		});
	}
}
