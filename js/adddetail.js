ca.init();
if (localStorage.getItem('detail') != '') {
	ca.id('detail_text').value = localStorage.getItem('detail');
}

var btn_detail = ca.id('btn_detail');
btn_detail.addEventListener('tap', function() {
	var detail_text = ca.id('detail_text').value;

	localStorage.setItem('detail', detail_text);

	var arr = ['go'];
	ca.sendNotice(arr, 'update', {});

	ca.closeCurrentInterface();
});
