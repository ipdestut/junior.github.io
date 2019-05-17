;$(function() {

	var win_width = $(window).width();
	var mobile = win_width < 576 ? true : false;


	$('.features-item-title').on('click', function(){

		var $this = this;

		$('.features-item-title').each(function(){

			if($this != this)
				$(this).siblings('.features-item-text').slideUp();
		});

		$(this).siblings('.features-item-text').slideToggle(function(){
			if(mobile){
				$('body, html').animate({
					scrollTop: $($this).offset().top - $('.float-panel').height()
				});
			}	
		});
	});

	$(window).on('resize', function(){
		win_width = $(window).width();
		mobile = win_width < 576 ? true : false;
	});

});
