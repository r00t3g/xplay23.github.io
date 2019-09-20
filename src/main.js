(function($){
	

	$('.slider_fourth').slick({
		arrows: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: true,
		autoplay: true,
		 autoplaySpeed: 2000,
		responsive: [
		    {
		      breakpoint: 1321,
		      settings: {
		        slidesToShow: 2,
		      }
		    }
		    ,
		    {
		      breakpoint: 881,
		      settings: {
		        slidesToShow: 1,
		      }
		    }
		  ]

	});
	var maxHeight = -1;
	$('.slider_vertical .slide').each(function() {
	  if ($(this).height() > maxHeight) {
	    maxHeight = $(this).height();
	  }
	});
	$('.slider_vertical .slide').each(function() {
	  if ($(this).height() < maxHeight) {
	    $(this).css('margin', Math.ceil((maxHeight-$(this).height())) + 'px 0 0');
	  }
	});
	$('.slider_vertical').slick({
		infinite: false,
		arrows: false,
		vertical: true,
		verticalSwiping: true,
		responsive: [
		    {
		      breakpoint: 1321,
		      settings: {
		        vertical: false,
		        verticalSwiping: false,
		      }
		    }
		    
		  ]
	})

	$('#why_invest').on('wheel', (function(e) {

	  if (e.originalEvent.deltaY > 0 && $('#why_invest .slick-active').index() +1 < $('#why_invest .slick-slide').length) {

	  	e.preventDefault();
	   $('.slider_vertical').slick('slickNext');

	  } else if(e.originalEvent.deltaY < 0 && $('#why_invest .slick-active').index() > 0){
	  	e.preventDefault();
	    $('.slider_vertical').slick('slickPrev');
	  }
	}));
	
	$('.video').click(function () {

		if($(this).children("video").get(0).paused){
			$(this).children("video").get(0).play();
			$(this).children(".play_btn").fadeOut();

		}else{
			$(this).children("video").get(0).pause();
			$(this).children(".play_btn").fadeIn();

		}
	});


	 $(document).on('mousemove',function(e){
	 	$('.paralax_el').each(function(ind,el){
	 		$(el).css('transform','translateX('+ (e.originalEvent.clientX/el.dataset.axelerate)+'px) translateZ(0)');
	 	})
    })
	 //////////////REMOVEEE
	$('.join_section .button,.join_section .close').click(function(e){
		e.preventDefault();
		$('.join_section .form').toggleClass('active');
	})
	$('form').submit(function(e){
		e.preventDefault();
		$(this).addClass('submited');
	})
	$('form .close').click(function(e){
		e.preventDefault();
		$(this).closest('form').removeClass('submited');
	});



	 //////////////REMOVEEE
	$('#main_menu_btn').click(function(e){
		e.preventDefault();
		$('#main_menu').fadeIn()
	})
	$('#main_menu .close_menu').click(function(e){
		e.preventDefault();
		$('#main_menu').fadeOut()
		
	})




	if($('#future_plans_graphic').length > 0){

		var config = {
			type: 'line',

			data: {
				labels: [],
				datasets: []
			},

			options: {
				legend: {
			        display: false
			    },
				responsive: true,
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: false
				},
				scales: {
					xAxes: [{
						display: true
					}],
					yAxes: [{
						display: true
					}]
				}
			}
		};

		var ctx = document.getElementById('future_plans_graphic').getContext('2d');
		window.myLine = new Chart(ctx, config);

		function getGraphic(form){
			$.post( form.attr('data-action'), function( data ) {
				config.data = jQuery.parseJSON(data);
				window.myLine.update();
			});
		}

		getGraphic($('#future_plans_graphic'));

	}
	$('.partnership .slider_fourth').on('beforeChange', function(event, slick, currentSlide, nextSlide){
	 $('.partnership .slider_fourth .slide').removeClass('visible_back')
	});

	$('.partnership .slider_fourth .slide').click(function(e){
		e.preventDefault();
		$('.partnership .slider_fourth .slide').removeClass('visible_back')
		$(this).addClass('visible_back')
		
	})



	$(window).on('scroll',function(e){
		var scrollItem = $('.scroll_item').eq(0);
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(scrolled > 30){
			$('#main_menu,.fixed_logo,#main_menu_btn').addClass('fixed')
		}else{
			$('#main_menu,.fixed_logo,#main_menu_btn').removeClass('fixed')

		}
		$('.scroll_item').each(function(ind,el){
			if( $(el).offset().top - $(window).height()/2 < scrolled  ) scrollItem = $(el);
		});
		$('#side_dots a').removeClass('active');
		$('#side_dots').find('[href="#' + scrollItem.attr('id') + '"').addClass('active');

	})

	// $(window).on('wheel',function(e){
	window.addEventListener('wheel',function(e){
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(scrolled > $('#why_invest').offset().top && scrolled < $('#why_invest').offset().top + $('#why_invest').height()){
			if(e.deltaY > 0){

				if($('#why_invest .slick-active').index() + 1 < $('#why_invest .slick-slide').length){
					window.scrollTo(0, $('#why_invest').offset().top)
					$('.slider_vertical').slick('slickNext');
					e.preventDefault();
					return false;
				}

			}

		}
	},{passive: false})


	$('#coocies .close,#coocies .true_accept').click(function(){
		$('#coocies').fadeOut();
	})

	$('#coocies .view_more').click(function(){
		$('#coocies p').addClass('visible');
		$(this).addClass('deactive');
	})
}(jQuery));