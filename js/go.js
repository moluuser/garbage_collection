ca.init();

var to_address = ca.id('to_address');
to_address.addEventListener('tap', function() {
	ca.newInterface({
		url: 'address.html',
		id: 'address'
	});
});


var myaddress_panel = ca.id('myaddress_panel');
myaddress_panel.addEventListener('tap', function() {
	ca.newInterface({
		url: 'address.html',
		id: 'address'
	});
});

var to_addgoods = ca.id('to_addgoods');
to_addgoods.addEventListener('tap', function() {
	ca.newInterface({
		url: 'addgoods.html',
		id: 'addgoods'
	});
});

var mygoods_panel = ca.id('mygoods_panel');
mygoods_panel.addEventListener('tap', function() {
	ca.newInterface({
		url: 'addgoods.html',
		id: 'addgoods'
	});
});


var delimg = ca.id('delimg');
delimg.addEventListener('tap', function() {
	ca.id('goodsimg').src = 'img/white.png';
});

var to_time = ca.id('to_time');
to_time.addEventListener('tap', function() {
	ca.newInterface({
		url: 'addtime.html',
		id: 'addtime'
	});
});

var to_adddetail = ca.id('to_adddetail');
to_adddetail.addEventListener('tap', function() {
	ca.newInterface({
		url: 'adddetail.html',
		id: 'adddetail'
	});
});

var lightingorder = ca.id('lightingorder');
lightingorder.addEventListener('tap', function() {
	var login_user = localStorage.getItem('login_user');
	if (login_user == null || login_user == '') {
		ca.prompt('请先登录后下单！');
		return;
	}
	if (localStorage.getItem('goodstype') == null || localStorage.getItem('contactname') == null || localStorage.getItem(
			'hometype') == null || localStorage.getItem('hometime') == null) {
		ca.prompt('请完整填写上门地址，回收物品及预约时间！');
		return;
	}

	var imgurl = '';
	if (ca.id('goodsimg').src.substr(0, 4) == 'file')
		imgurl = '';
	else
		imgurl = ca.id('goodsimg').src;

	var orderd = '';
	if (localStorage.getItem('detail') == null)
		orderd = '';
	else
		orderd = localStorage.getItem('detail');

	// 闪电下单
	ca.get({
		url: request_url + '/Order/addOrder',
		data: {
			uid: localStorage.getItem('login_id'),
			contactname: localStorage.getItem('contactname'),
			contacttel: localStorage.getItem('contacttel'),
			homeaddress: localStorage.getItem('homeaddress'),
			detailaddress: localStorage.getItem('detailaddress'),
			goodstype: localStorage.getItem('goodstype'),
			goodsname: localStorage.getItem('goodsname'),
			goodsnum: localStorage.getItem('goodsnum'),
			price: localStorage.getItem('price'),
			hometype: localStorage.getItem('hometype'),
			hometime: localStorage.getItem('hometime'),
			detail: orderd,
			photo: imgurl
		},
		succFn: function(data) {
			if (data > 0) {
				ca.prompt('订单提交成功！您可以在我的订单中查看订单状态');
				localStorage.removeItem('hometype');
				localStorage.removeItem('hometime');
				localStorage.removeItem('detail');
				localStorage.removeItem('contactname');
				localStorage.removeItem('contacttel');
				localStorage.removeItem('homeaddress');
				localStorage.removeItem('detailaddress');
				localStorage.removeItem('goodstype');
				localStorage.removeItem('goodsname');
				localStorage.removeItem('goodsnum');
				localStorage.removeItem('price');
				ca.id('goodsimg').src = 'img/white.png';

				ca.closeCurrentInterface();

			} else {
				ca.prompt('订单提交失败！');
			}

		}
	})
});



var addimg = ca.id('addimg');
addimg.addEventListener('tap', function() {
	var arr = ['拍照', '相册'];
	ca.actionSheet(arr, {
		succFn: function(data) {
			if (data) {
				// console.log(server_host + data);
				var myid = localStorage.getItem('login_id');
				var new_avatar = server_host + data;
				// ca.prompt('上传成功！');
				// 成功todo
				var goodimg = server_host + data;
				ca.id('goodsimg').src = goodimg;

			} else {
				ca.prompt('您还没有选择照片！');
			}
		},
		isUpload: true,
		uploadUrl: upload_url,

	});
});


get_info();

function get_info() {
	var go_display = ca.className('go-display');
	if (localStorage.getItem('hometype') != null) {
		go_display['0'].innerHTML = localStorage.getItem('hometype') + ' | ' + localStorage.getItem('hometime');
	} else {
		go_display['0'].innerHTML = '';
	}

	if (localStorage.getItem('detail') != null) {
		go_display['1'].innerHTML = localStorage.getItem('detail');
	} else {
		go_display['1'].innerHTML = '';
	}

	if (localStorage.getItem('contactname') != null) {
		var myaddress_panel = ca.id('myaddress_panel');
		myaddress_panel.style.display = 'block';
		var to_address = ca.id('to_address');
		to_address.style.display = 'none';
		var myaddress = ca.className('myaddress');
		myaddress['0'].innerHTML = '联系人：' + localStorage.getItem('contactname');
		myaddress['1'].innerHTML = '手机号码：' + localStorage.getItem('contacttel');
		myaddress['2'].innerHTML = '上门地址：' + localStorage.getItem('homeaddress');
		myaddress['3'].innerHTML = '详细地址：' + localStorage.getItem('detailaddress');
	} else {
		var myaddress_panel = ca.id('myaddress_panel');
		myaddress_panel.style.display = 'none';
		var to_address = ca.id('to_address');
		to_address.style.display = 'block';
	}

	if (localStorage.getItem('goodstype') != null) {
		var mygoods_panel = ca.id('mygoods_panel');
		mygoods_panel.style.display = 'block';
		var to_addgoods = ca.id('to_addgoods');
		to_addgoods.style.display = 'none';
		var mygoods = ca.className('mygoods');
		mygoods['0'].innerHTML = '类别规格：' + localStorage.getItem('goodstype');
		mygoods['1'].innerHTML = '名称：' + localStorage.getItem('goodsname');
		mygoods['2'].innerHTML = '数量：' + localStorage.getItem('goodsnum');
		mygoods['3'].innerHTML = '预估价格：' + localStorage.getItem('price');
	} else {
		var mygoods_panel = ca.id('mygoods_panel');
		mygoods_panel.style.display = 'none';
		var to_addgoods = ca.id('to_addgoods');
		to_addgoods.style.display = 'block';
	}
}

var reset_info = ca.id('reset_info');
reset_info.addEventListener('tap', function() {
	localStorage.removeItem('hometype');
	localStorage.removeItem('hometime');
	localStorage.removeItem('detail');
	localStorage.removeItem('contactname');
	localStorage.removeItem('contacttel');
	localStorage.removeItem('homeaddress');
	localStorage.removeItem('detailaddress');
	localStorage.removeItem('goodstype');
	localStorage.removeItem('goodsname');
	localStorage.removeItem('goodsnum');
	localStorage.removeItem('price');
	ca.id('goodsimg').src = 'img/white.png';
	get_info();
	ca.prompt('重置成功！');
});

ca.receiveNotice('update', function() {
	get_info();
});
