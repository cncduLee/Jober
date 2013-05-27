$(function(){
	var timer = 5 * 1000;//5s
	$(".alert").alert();
	setTimeout(function(){$(".alert").alert('close');},timer); //停留一段时间后强行关闭alert窗口
});