$(function() {
	smoothScroll(300);
	workbelt();
	workLoad();
	goUp();
	personStuff();
	inputCheck();

	$("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
});

// SmoothScroll function is applied from the document ready function
function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

// Transition between thumbs and detailed work
function workbelt() {

	$('.thumb-overlay').click(function() {
		$('.work-belt').css('left','-100%');
		$('.work-container').show();
	});

	$('.return').click(function() {
		$('.work-belt').css('left','0%');
		$('.work-container').hide(800);
	});
}

// Work section transition to detailed content
function workLoad() {

	$.ajaxSetup({ cache: true });

	$('.thumb-overlay').click(function() {
	
			var $this = $(this),
	        newTitle = $this.find('strong').text(),
	        newfolder = $this.data('folder'),
	        spinner = '<div class="loader">Loading...</div>',
	        newHTML = '/assets/work/' + newfolder + '.html';
	      
	    $('.project-load').html(spinner).load(newHTML);
	    $('.project-title').text(newTitle);
	  });

}

// Work section thumbnail slide in
$(window).scroll(function(){

  var wScroll = $(this).scrollTop();

    if(wScroll > $('.thumb-container').offset().top - ($(window).height() / 1.2)) {

    $('.thumb-container a').each(function(i){

      setTimeout(function(){
      $('.thumb-container a').eq(i).addClass('is-showing');
    }, 200 * (i + 1));
    });

  }

});

// Go up to work section
function goUp() {
	$(".go-up").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".section-work").offset().top
	    }, 800);
	});
}

// Testimonial section carousel
function personStuff() {

	$('.person-unit').first().addClass('active-person');
	$('.logos').first().addClass('active-person');
	$('.person-mobile-nav span').first().addClass('active-person');

	$('.logos, .person-mobile-nav span').click(function() {
		var $this = $(this),
			$siblings = $this.parent().children(),
			position = $siblings.index($this);

		$('.person-unit').removeClass('active-person').eq(position).addClass('active-person');
		$siblings.removeClass('active-person');
		$this.addClass('active-person');
	});

	$('.person-control-next, .person-control-prev').click(function() {

		var $this = $(this),
			curActivePerson = $('.testimonials-belt').find('.active-person'),
			position = $('.testimonials-belt').children().index(curActivePerson),
			personNum = $('.person-unit').length;

			if($this.hasClass('person-control-next')) {
				
				if(position < personNum -1){
					$('.active-person').removeClass('active-person').next().addClass('active-person');
				} else {
					$('.person-unit').removeClass('active-person').first().addClass('active-person');
					$('.logos').removeClass('active-person').first().addClass('active-person');
				}
			} else {
				if (position === 0) {
					$('.person-unit').removeClass('active-person').last().addClass('active-person');
					$('.logos').removeClass('active-person').last().addClass('active-person');
				} else {
					$('.active-person').removeClass('active-person').prev().addClass('active-person');
				}
			}
	});

}

function inputCheck() {
	$('.form .input-group input, textarea').focusout(function(){

		var text_val = $(this).val();

		if(text_val === '') {
			$(this).removeClass('has-value');

		} else {

			$(this).addClass('has-value');
		}
		
	});
}

// Auto fit text to resolution
(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );
