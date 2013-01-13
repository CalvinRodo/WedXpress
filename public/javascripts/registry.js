$(function(){
	$("#RegistryContents").masonry({
		itemSelector: '.item',
		columnWidth: 100
		});
	$(".item").hover(function(){
		$(this).siblings().stop().fadeTo("fast",0.5);
	}, function(){
		$(this).siblings().stop().fadeTo("fast",1);
	})
});