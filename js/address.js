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

if (localStorage.getItem('contactname') != null) {
	var address = ca.className('address');
	address['0'].value = localStorage.getItem('contactname');
	address['1'].value = localStorage.getItem('contacttel');
	address['2'].value = localStorage.getItem('homeaddress');
	address['3'].value = localStorage.getItem('detailaddress');
}

var btn_address = ca.id('btn_address');
btn_address.addEventListener('tap', function() {
	var address = ca.className('address');

	if (address['0'].value != '' && address['1'].value && address['2'].value && address['3'].value != '') {
		if (address['1'].value.length != 11) {
			ca.prompt('手机号码格式错误！');
			return;
		}
		localStorage.setItem('contactname', address['0'].value);
		localStorage.setItem('contacttel', address['1'].value);
		localStorage.setItem('homeaddress', address['2'].value);
		localStorage.setItem('detailaddress', address['3'].value);
		var arr = ['go'];
		ca.sendNotice(arr, 'update', {});
		ca.closeCurrentInterface();
	} else {
		ca.prompt('填写信息不完整！');
		return;
	}
});
