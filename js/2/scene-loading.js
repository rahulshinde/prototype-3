$(document).ready(function(){
 	$('#enter').click(function() {
 		$('.intro').fadeToggle('fast', function() {});

 		$('#close').fadeToggle('slow', function() {});

 		$('#three-container').fadeToggle('slow', function() {});

		$('#story-container').fadeToggle('slow', function() {});

	});

	$('#close').click(function() {

		$('#close').fadeToggle('fast', function() {});

 		$('#three-container').fadeToggle('fast', function() {});

		$('#story-container').fadeToggle('fast', function() {});

		$('.intro').fadeToggle('slow', function() {});
	});      
});