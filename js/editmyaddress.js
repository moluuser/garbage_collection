ca.init();
(function($, doc) {
	$.init();
	$.ready(function() {
		/**
		 * 获取对象属性的值
		 * 主要用于过滤三级联动中，可能出现的最低级的数据不存在的情况，实际开发中需要注意这一点；
		 * @param {Object} obj 对象
		 * @param {String} param 属性名
		 */
		var _getParam = function(obj, param) {
			return obj[param] || '';
		};

		//-----------------------------------------
		//					//级联示例
		var cityPicker3 = new $.PopPicker({
			layer: 3
		});
		cityPicker3.setData(cityData3);
		var showCityPickerButton = doc.getElementById('showCityPicker3');
		var cityResult3 = doc.getElementById('cityResult3');
		var myaddress = ca.id('myaddress');
		showCityPickerButton.addEventListener('tap', function(event) {
			cityPicker3.show(function(items) {
				myaddress.value = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " +
					_getParam(items[2], 'text');
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	});
})(mui, document);

var btn_address = ca.id('btn_address');

if (localStorage.getItem('aid') != null || localStorage.getItem('aid') != '') {
	// alert();
	ca.get({
		url: request_url + '/Myaddress/getMyaddressById',
		data: {
			aid: localStorage.getItem('aid')
		},
		succFn: function(data) {
			// alert(data);
			if (data) {
				var json = JSON.parse(data);
				var address = ca.className('address');
				address['0'].value = json.contactname;
				address['1'].value = json.contacttel;
				address['2'].value = json.homeaddress;
				address['3'].value = json.detailaddress;
			} else {
				ca.prompt('系统错误！');
			}

		}
	})
}


btn_address.addEventListener('tap', function() {
	var login_user = localStorage.getItem('login_user');
	if (login_user == null || login_user == '') {
		ca.newInterface({
			url: 'login.html',
			id: 'login'
		});
		return;
	}
	var address = ca.className('address');

	if (address['0'].value != '' && address['1'].value && address['2'].value && address['3'].value != '') {
		if (address['1'].value.length != 11) {
			ca.prompt('手机号码格式错误！');
			return;
		}
		ca.get({
			url: request_url + '/Myaddress/updMyaddressById',
			data: {
				aid: localStorage.getItem('aid'),
				contactname: address['0'].value,
				contacttel: address['1'].value,
				homeaddress: address['2'].value,
				detailaddress: address['3'].value
			},
			succFn: function(data) {
				// alert(data);
				if (data > 0) {
					ca.prompt('保存成功！');
					localStorage.removeItem('aid');
					var arr = ['myaddress'];
					ca.sendNotice(arr, 'update', {});
					ca.closeCurrentInterface();
				} else {
					ca.prompt('保存失败！');
				}

			}
		})
	} else {
		ca.prompt('填写信息不完整！');
		return;
	}
});
