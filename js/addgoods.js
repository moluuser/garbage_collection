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
				var goodsPicker = new $.PopPicker({
					layer: 3
				});
				goodsPicker.setData(goodsData);
				var showCityPickerButton = doc.getElementById('showgoodsPicker');
				var cityResult3 = doc.getElementById('cityResult3');
				var mygoods = ca.id('mygoods');
				showCityPickerButton.addEventListener('tap', function(event) {
					goodsPicker.show(function(items) {
						mygoods.value = _getParam(items[0], 'text') + " " + _getParam(items[1], 'text') + " " +
							_getParam(items[2], 'text');
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
			});
		})(mui, document);


		if (localStorage.getItem('goodstype') != null) {
			var addgoodinput = ca.className('addgoodinput');
			addgoodinput['0'].value = localStorage.getItem('goodstype');
			addgoodinput['1'].value = localStorage.getItem('goodsname');
			addgoodinput['2'].value = localStorage.getItem('goodsnum');
			addgoodinput['3'].value = localStorage.getItem('price');
		}

		var btn_addgoods = ca.id('btn_addgoods');
		btn_addgoods.addEventListener('tap', function() {
			var addgoodinput = ca.className('addgoodinput');

			if (addgoodinput['0'].value != '' && addgoodinput['1'].value && addgoodinput['2'].value && addgoodinput['3'].value !=
				'') {
				localStorage.setItem('goodstype', addgoodinput['0'].value);
				localStorage.setItem('goodsname', addgoodinput['1'].value);
				localStorage.setItem('goodsnum', addgoodinput['2'].value);
				localStorage.setItem('price', addgoodinput['3'].value);

				var arr = ['go'];
				ca.sendNotice(arr, 'update', {});
				ca.closeCurrentInterface();
			} else {
				ca.prompt('填写信息不完整！');
				return;
			}
		});
