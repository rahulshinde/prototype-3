$(document).ready(function(){


	$('#text').scroll( function() {
		console.log($('#marker-2').offset().top - 23);
		console.log($('#text').height());

		if ($('#marker-2').offset().top - 23 < $('#text').height() / 2) {
			console.log();
			$('#flag-1').fadeTo('fast', 0, function() {});

			function srcChange () {
				var src1 = $('#iframe1').attr('src');
				$('#iframe1').attr('src', src1.replace("autoplay=1", "autoplay=0"));
				var src2 = $('#iframe2').attr('src');
				$('#iframe2').attr('src', src2.replace("autoplay=0", "autoplay=1"));
			}

			$.when( srcChange() ).done(function() {
    			$('#flag-2').fadeTo('slow', 1, function() {});
  			});

  			srcChange();

    	} else {
			
			return;

    	}
	});
     
});