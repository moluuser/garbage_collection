ca.init();
var login_user = localStorage.getItem('login_user')
var my_score = ca.id('my_score');


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
				my_score.innerHTML = json.score;
			} else {
				ca.prompt('获取用户失败！');
			}
		}
	})
}

get_scorelog();

function get_scorelog() {
	ca.get({
		url: request_url + '/Scorelog/getScorelogByUid',
		data: {
			uid: localStorage.getItem('login_id')
		},
		succFn: function(data) {
			if (data != '[]') {
				// alert(data);
				ca.id('nodetail').style.display = 'none';
				var json = JSON.parse(data);
				// alert(data);
				for (var a in json) {
					var scoredelta = '';
					if (json[a].delta > 0) {
						scoredelta = '<span style="color: red">+' + json[a].delta + '</span>';
					} else {
						scoredelta = '<span style="color: green">-' + json[a].delta + '</span>';
					}
					var tmpl =
						`<div style="padding: 6px 15px;">
								<div class="ye-div-b-div-o">
									<span class="div-o-l">` +
						json[a].detail +
						`</span>
									<span class="div-o-r"></span>
								</div>
								<div class="ye-div-m-div-t">
									<span class="div-o-l div-b-l">` +
						json[a].createtime + `</span>
									<span class="div-o-r div-b-r">` + scoredelta +
						`</span>
								</div>
							</div>
							<hr align=center width=95% color=#e6e6e6 size=1>
								`;

					ca.id('logpanel').innerHTML += tmpl;
				}
			} else {
				ca.id('nodetail').style.display = 'block';
			}
		}
	})
}
