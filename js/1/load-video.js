$(document).ready(function(){

	var flag1 = '#flag1',
		flag2 = '#flag-2';

	var w = 1,
		x = 0,
		y = 0;	


	$('#text').scroll( function() {
		console.log($('#text').scrollTop()-9);
		console.log($('#text').height());

		if ($('#text').scrollTop()-9 < $('#text').height() * 2 && $('#marker-2').offset().top - 23 > $('#text').height() / 2 && w!=1) {

			$(flag2).fadeTo('fast', 0,  function() {});
			$(flag1).fadeTo('slow', 1, function() {});
			

			w=1;
			x=0;
			y=0;

		} else if ($('#marker-2').offset().top - 23 < $('#text').height() / 2 && $('#marker-3').offset().top - 23 > $('#text').height() / 2 && x!=1 )  {
			$(flag1).fadeTo('fast', 0, function() {});
			$(flag2).fadeTo('slow', 1,  function() {});

			w=0;
			x=1;
			y=0;


    	} else if ($('#marker-3').offset().top - 23 < $('#text').height() / 2 && $('#marker-4').offset().top - 23 > $('#text').height() / 2 && y!=1) {
    		$(flag2).fadeTo('fast', 0, function() {});
    		$(flag1).fadeTo('slow', 1, function() {});

    		w=0;
    		x=0;
    		y=1;

    	}

	});
     
});