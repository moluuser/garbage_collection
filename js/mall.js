mui.init();
get_mall();

function get_mall() {
	ca.get({
		url: request_url + '/Product/getProductList',
		data: {

		},
		succFn: function(data) {
			if (data != '[]') {
				var json = JSON.parse(data);
				var tmpl = '';
				for (var a in json) {
					if (a % 3 == 0) {
						tmpl += '<div class="mall-menu">';
					}
					tmpl += `
							<div class="mall-menu-div" price="` + json[a].price + `" pid="` + json[a].pid + `" pname="` +
						json[a].pname +
						`">
								<img src="` + json[a].img +
						`" />
								<p>` + json[
							a].pname + `</p>
								<p><span style="color: #ade06f;">` + json[a].price +
						`</span> 环保币</p>
							</div>`;
					if ((a + 1) % 3 == 0) {
						tmpl += '</div>';
					}
					// console.log(a + 1);
					if ((a + 1) % 3 != 0 && (parseInt(a) + 1) == json.length) {
						// console.log(a);
						tmpl += '</div>';
					}
				}
				// console.log(tmpl);
				ca.id('mallitem').innerHTML += tmpl;
				click_event();
			} else {
				// ca.prompt('暂无信息！');
			}
		}
	})
}


function click_event() {
	var malldiv = ca.className('mall-menu-div');
	for (var i = 0; i < malldiv.length; ++i) {
		malldiv[i].addEventListener('tap', function() {
			var pid = this.getAttribute('pid');
			var pname = this.getAttribute('pname');
			var price = parseInt(this.getAttribute('price'));
			// alert(pname);
			var btnArray = ['否', '是'];
			mui.confirm('确认要花费' + price + '积分兑换' + pname + '吗？', '积分商城', btnArray, function(e) {
				if (e.index == 1) {
					// 确认兑换
					ca.get({
						url: request_url + '/Product/getProductNumById',
						data: {
							pid: pid
						},
						succFn: function(data) {
							// alert(data);
							if (data > 0) {
								// 判断当前积分
								ca.get({
									url: request_url + '/User/getUserScoreById',
									data: {
										uid: localStorage.getItem('login_id'),
									},
									succFn: function(data) {
										if (parseInt(data) >= price) {
											// 新增log
											ca.get({
												url: request_url + '/Scorelog/addScorelog',
												data: {
													uid: localStorage.getItem('login_id'),
													delta: -price,
													detail: '兑换' + pname
												},
												succFn: function(data) {
													// alert(data);
													if (data > 0) {
														// 减积分
														ca.get({
															url: request_url + '/User/updUserScore',
															data: {
																uid: localStorage.getItem('login_id'),
																changevar: -price,
															},
															succFn: function(data) {
																ca.prompt('兑换成功！可前往个人中心查看');
															}
														})
													} else
														ca.prompt('系统错误！');
												}
											})
										} else {
											ca.prompt('您的积分不足！');
										}
									}
								})
							} else {
								ca.prompt('该商品库存不足！');
							}
						}
					})
				} else {

				}
			})
		});
	}
}
