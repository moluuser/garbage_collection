ca.init();
get_order();

function get_order() {
	var order_info = ca.id('have-order');
	var login_id = localStorage.getItem('login_id');
	ca.get({
		url: request_url + '/Order/getOrderListByUid',
		data: {
			uid: login_id
		},
		succFn: function(data) {
			if (data != '[]') {
				ca.id('no-order').style.display = 'none';
				ca.id('have-order').style.display = 'block';
				// console.log(data);
				// 遍历显示订单
				var json = JSON.parse(data);
				for (d in json) {
					var orderimg = json[d].photo == '' ? 'img/white.png' : json[d].photo;
					var tmpl = `<div class="mui-card">
								<div class="mui-card-footer">
									<span>订单号：` + json[d].oid +
						`</span>
									<span>` + json[d].createtime +
						`</span>
								</div>
								<div style="position: absolute; left: 5rem; margin-top: 0.5rem;">
									<p style="color: #333;">` +
						json[d].goodsname + `</p>
									<p>￥` + json[d].price +
						`</p>
								</div>
								<div style="position: absolute; right: 0.625rem; margin-top: 0.5rem;">
									<p>` +
						json[d].status + `</p>
									<p>X ` + json[d].goodsnum +
						`</p>
								</div>
								<div class="mui-card-header">
									<img src="` + orderimg +
						`" />
								</div>
							
								<div class="mui-card-content">
									<a oid="` + json[d].oid +
						`" class='to_orderdetail' style="float: right; margin-right: 0.625rem; color: #b4d145; margin-bottom: 0.625rem;">查看详情 ></a>
								</div>
							
							</div>`;
					var order_info = ca.id('have-order');
					order_info.innerHTML += tmpl;
					click_event();
				}

			} else {
				ca.id('no-order').style.display = 'block';
				ca.id('have-order').style.display = 'none';
			}
		}
	})
}

function click_event() {
	var to_orderdetail = ca.className('to_orderdetail');
	for (var i = 0; i < to_orderdetail.length; ++i) {
		to_orderdetail[i].addEventListener('tap', function() {
			var oid = this.getAttribute('oid');
			localStorage.setItem('oid', oid);
			ca.newInterface({
				url: 'orderdetail.html',
				id: 'orderdetail'
			});
		});
	}
}
