$(document).ready(function(){
	$('#main-wrapper_t').click(function(){
		$('html, body').animate({
	        scrollTop: $(".main-wrapper").offset().top
	    }, 1000);
	});

	$('#home_t').click(function(){
		$('html, body').animate({
	        scrollTop: $(".home").offset().top
	    }, 1000);
	});

	$('#specials_t').click(function(){
		$('html, body').animate({
	        scrollTop: $(".special").offset().top
	    }, 1000);
	});

	$('#reservation_t').click(function(){
		$('html, body').animate({
	        scrollTop: $(".reservation").offset().top
	    }, 1000);
	});

	$('#menu_t').click(function(){
		$('html, body').animate({
	        scrollTop: $(".menu").offset().top
	    }, 1000);
	});
});