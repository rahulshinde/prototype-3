$(document).ready(function(){

	var flag1 = '#flag1',
		flag2 = '#flag-2'


	$('#text').scroll( function() {
		console.log($('#marker-4').offset().top - 23);
		console.log($('#text').height());

		if ($('#marker-2').offset().top - 23 < $('#text').height() / 2 && $('#marker-3').offset().top - 23 > $('#text').height() / 2)  {
			$(flag1).fadeTo('slow', 0, function() {});
			$(flag2).fadeTo('fast', 1, function() {});

    	} else if ($('#marker-3').offset().top - 23 < $('#text').height() / 2 && $('#marker-4').offset().top - 23 > $('#text').height() / 2) {
    		$(flag2).fadeTo('slow', 0, function() {});
			console.log('hello');

    	}

	});
     
});