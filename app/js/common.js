;$(function() {

	var win_width = $(window).width();
	var mobile = win_width < 576 ? true : false;
	var timer, stateIndex = 1;
	var timerInterval = 10000;


	function gotoState(){
		// 1 - вращаем барабан
		$('.animate-revolver-wrap').css({
			transform: 'rotate(' + (stateIndex-1)*72 + 'deg)'
		});

		// 2 - изменяем положение и свойства иконок
		$('.animate-revolver i').css({
			opacity: 0
		});

		var pos = stateIndex <= 5 ? stateIndex  : 1;

		setTimeout(function(){
			$('.animate-revolver i').each(function(){
				var id = $(this).data('id');

				var move = +id - (pos - 1);
				if (move < 1)
					move += 5;
				$(this).removeClass('pos1 pos2 pos3 pos4 pos5 pos6');
				$(this).addClass('pos' + move);
			});

			$('.animate-revolver i').css({
				opacity: 1
			});
		}, 800);

		// 3 - вращаем нижнее колесо
		$('.animate-balls').css({
			transform: 'rotate(-' + (stateIndex-1)*72 + 'deg)'
		});
		$('.animate-balls p').css({
			transform: 'rotate(' + (stateIndex-1)*72 + 'deg)'
		});

		// 4 - меняем title 
		$('.animate-title').removeClass('pos1 pos2 pos3 pos4 pos5');
		$('.animate-title').addClass('pos'+ pos);
		$('.animate-title h2').removeClass('active');
		$('.animate-title h2[data-id='+pos+']').addClass('active');
		// 5 - анимаци описания
		$('.animate-description-wrap h3').removeClass('active');
		$('.animate-description-wrap h3[data-id='+pos+']').addClass('active');

		if (stateIndex <= 5)
			stateIndex++;
		else{
			setTimeout(function(){
				$('.animate-revolver-wrap, .animate-balls').css({
					transition: 'none',
					transform: 'rotate(0deg)'
				});
				setTimeout(function(){
					$('.animate-revolver-wrap, .animate-balls').css({
						transition: ''
					});	
				}, 100);
			}, 1100);
			stateIndex = 2;
		}
	}

	function animation(){
		gotoState();
		timer = setInterval(gotoState, timerInterval);
	}

	animation();

	$('.animate-revolver i').on('click', function(){
		clearInterval(timer);
		stateIndex = $(this).data('id');
		gotoState();
		timer = setInterval(gotoState, timerInterval);
	});

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


	$('.director-more').on('click', function(e){
		e.preventDefault();

		$(this).closest('.director').find('.director-info-more').slideToggle();

		$(this).toggleClass('active');
	});

	$('.treners-wrapper').lightSlider({
		item: 1,
		loop: true,
		auto: true,
		pause: 5000,
		slideMargin: 100,
	});

	$(window).on('resize', function(){
		win_width = $(window).width();
		mobile = win_width < 576 ? true : false;
	});

});
