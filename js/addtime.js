ca.init();


(function($) {
	$.init();
	var result = $('#mytime')[0];
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var _self = this;
			if (_self.picker) {
				_self.picker.show(function(rs) {
					result.value = '选择结果: ' + rs.text;
					_self.picker.dispose();
					_self.picker = null;
				});
			} else {
				var optionsJson = this.getAttribute('data-options') || '{}';
				var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				/*
				 * 首次显示时实例化组件
				 * 示例为了简洁，将 options 放在了按钮的 dom 上
				 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
				 */
				_self.picker = new $.DtPicker(options);
				_self.picker.show(function(rs) {
					/*
					 * rs.value 拼合后的 value
					 * rs.text 拼合后的 text
					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
					 * rs.m 月，用法同年
					 * rs.d 日，用法同年
					 * rs.h 时，用法同年
					 * rs.i 分（minutes 的第二个字母），用法同年
					 */
					var addtime_select = ca.id('addtime_select').value;
					if (addtime_select != '随时可以') {
						result.value = rs.text;
					} else {
						ca.prompt('预约时间为“随时可以”时，不需要填写上门时间！')
					}

					/* 
					 * 返回 false 可以阻止选择框的关闭
					 * return false;
					 */
					/*
					 * 释放组件资源，释放后将将不能再操作组件
					 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
					 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
					 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
					 */
					_self.picker.dispose();
					_self.picker = null;
				});
			}

		}, false);
	});
})(mui);


var btn_addtime = ca.id('btn_addtime');
btn_addtime.addEventListener('tap', function() {
	var addtime_select = ca.id('addtime_select').value;
	var mytime = ca.id('mytime').value;
	// alert(addtime_select);
	if (addtime_select == '') {
		ca.prompt('请选择预约时间！');
		return;
	}
	if (addtime_select != '随时可以' && mytime == '') {
		ca.prompt('请选择上门时间！');
		return;
	}
	localStorage.setItem('hometype', addtime_select);
	localStorage.setItem('hometime', mytime);

	var arr = ['go'];
	ca.sendNotice(arr, 'update', {});

	ca.closeCurrentInterface();
});

if (localStorage.getItem('hometype') != '') {
	ca.id('addtime_select').value = localStorage.getItem('hometype');
}
if (localStorage.getItem('hometime') != '') {
	ca.id('mytime').value = localStorage.getItem('hometime');
}
