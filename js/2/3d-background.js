//general scene variables

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;	

//variables for movable light

var mouseXL = 0, mouseY = 0;

//variables for canvas rotation

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;


var container = document.getElementById( 'three-container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x2defff, 1, 4500 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xf8ffa8, 1, 4500 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 0, -50 );
	scene.add( light2 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );


	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;

	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

	mouseXL = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}

function animate() {

	requestAnimationFrame( animate );

	render();

}	

function render() {
	light1.position.set ( (mouseX - light1.position.x) * 0.075, - (mouseY - light1.position.y) * 0.075, 50);
	group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;

	renderer.render(scene, camera);
};
