ca.init();
get_item();

function get_item() {
	ca.get({
		url: request_url + '/Order/getOrderById',
		data: {
			oid: localStorage.getItem('oid')
		},
		succFn: function(data) {
			if (data) {
				// alert(data);
				var json = JSON.parse(data);
				ca.id('order_status').innerHTML = json.status;
				var order_info = ca.className('order_info');
				order_info['0'].innerHTML = json.oid;
				order_info['1'].innerHTML = json.createtime;
				order_info['2'].innerHTML = json.contactname;
				order_info['3'].innerHTML = json.contacttel;
				order_info['4'].innerHTML = json.homeaddress;
				order_info['5'].innerHTML = json.detailaddress;
				order_info['6'].innerHTML = json.goodstype;
				order_info['7'].innerHTML = json.goodsname;
				order_info['8'].innerHTML = json.goodsnum;
				order_info['9'].innerHTML = json.price;
				order_info['10'].innerHTML = json.hometype;
				order_info['11'].innerHTML = json.hometime;
				if (json.detail != '')
					order_info['12'].innerHTML = json.detail;
				else {
					order_info['12'].innerHTML = '';
				}
				if (json.photo) {
					ca.id('order_img').src = json.photo;
				} else {
					ca.id('order_img').src = 'img/white.png';
				}

			} else {
				ca.prompt('获取订单信息失败！');
			}
		}
	})
}
