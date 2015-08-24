$(document).ready(function(){
 	$('#enter').click(function() {
 		$('.intro').fadeToggle('fast', function() {});

 		$('#three-container').fadeToggle('fast', function() {});

 		$('#close').fadeToggle('slow', function() {});

		$('#story-container').fadeToggle('slow', function() {});

		$('#flag-1').fadeTo('slow', 1, function() {});

	});

	$('#close').click(function() {

		$('#close').fadeToggle('fast', function() {});

 		$('#three-container').fadeToggle('fast', function() {});

		$('#story-container').fadeToggle('fast', function() {});
		$('#flag-1').fadeTo('fast', 0, function() {});

		$('.intro').fadeToggle('slow', function() {});
	});      
});