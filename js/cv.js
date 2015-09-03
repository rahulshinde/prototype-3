$('#1').hover(
	function() {
		$('#fill-target').append( $('<h2>DESIGNER</h2>') );
		console.log('1');
	}, function() {
    $( '#fill-target' ).find( "h2:last" ).remove();
  }
);

$('#2').hover(
	function() {
		$('#fill-target').append( $('<h2>FRONT-END DEVELOPER</h2>') );
	}, function() {
    $( '#fill-target' ).find( "h2:last" ).remove();
  }
);

$('#3').hover(
	function() {
		$('#fill-target').append( $('<h2>SYSTEMS BUILDER</h2>') );
	}, function() {
    $( '#fill-target' ).find( "h2:last" ).remove();
  }
);

$('#4').hover(
	function() {
		$('#fill-target').append( $('<h2>WRITER</h2>') );
	}, function() {
    $( '#fill-target' ).find( "h2:last" ).remove();
  }
);