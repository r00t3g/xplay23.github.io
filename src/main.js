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

	$('.join_section .button,.join_section .close').click(function(e){
		e.preventDefault();
		$('.join_section .form').toggleClass('active');
	})

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
}(jQuery));