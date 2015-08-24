
var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];

var raycaster;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );

// http://www.html5rocks.com/en/tutorials/pointerlock/intro/

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

if ( havePointerLock ) {

	var element = document.body;

	var pointerlockchange = function ( event ) {

		if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

			controlsEnabled = true;
			controls.enabled = true;

			blocker.style.display = 'none';

		} else {

			controls.enabled = false;

			blocker.style.display = '-webkit-box';
			blocker.style.display = '-moz-box';
			blocker.style.display = 'box';

			instructions.style.display = '';

		}

	}

	var pointerlockerror = function ( event ) {

		instructions.style.display = '';

	}

	// Hook pointer lock state change events
	document.addEventListener( 'pointerlockchange', pointerlockchange, false );
	document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
	document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

	document.addEventListener( 'pointerlockerror', pointerlockerror, false );
	document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
	document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

	instructions.addEventListener( 'click', function ( event ) {

		instructions.style.display = 'none';

		// Ask the browser to lock the pointer
		element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

		if ( /Firefox/i.test( navigator.userAgent ) ) {

			var fullscreenchange = function ( event ) {

				if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

					document.removeEventListener( 'fullscreenchange', fullscreenchange );
					document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

					element.requestPointerLock();
				}

			}

			document.addEventListener( 'fullscreenchange', fullscreenchange, false );
			document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

			element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

			element.requestFullscreen();

		} else {

			element.requestPointerLock();

		}

	}, false );

} else {

	instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

init();
animate();

var controlsEnabled = false;

var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

function init() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	scene.add( light );

	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );

	var onKeyDown = function ( event ) {

		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
							moveForward = true;
							break;

			case 37: // left
			case 65: // a
							moveLeft = true; break;

			case 40: // down
			case 83: // s
							moveBackward = true;
							break;

			case 39: // right
			case 68: // d
							moveRight = true;
							break;

		}

	};

	var onKeyUp = function ( event ) {

		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // s
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};

	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	/////////
	//scene//
	/////////
	
	var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } );

	//video-screen

	var geometry1 = new THREE.BoxGeometry( 10, 7, 0.1 );
	var cube1 = new THREE.Mesh( geometry1, material );
	scene.add( cube1 );
	cube1.position.y = 10;
	cube1.position.z = -10;

	var geometry2 = new THREE.BoxGeometry( 2, 15, 20 );
	var wall1 = new THREE.Mesh( geometry2, material );
	scene.add( wall1 );
	wall1.position.y = 15;
	wall1.position.x = 13;
	wall1.position.z = -40;

	var geometry3 = new THREE.BoxGeometry( 10, 15, 2 );
	var wall1 = new THREE.Mesh( geometry3, material );
	scene.add( wall1 );
	wall1.position.y = 15;
	wall1.position.x = 9;
	wall1.position.z = -52;


	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x000000 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

	requestAnimationFrame( animate );

	if ( controlsEnabled ) {
					raycaster.ray.origin.copy( controls.getObject().position );
					raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );

		var isOnObject = intersections.length > 0;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		if ( moveForward ) velocity.z -= 70.0 * delta;
		if ( moveBackward ) velocity.z += 70.0 * delta;

		if ( moveLeft ) velocity.x -= 70.0 * delta;
		if ( moveRight ) velocity.x += 70.0 * delta;

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateZ( velocity.z * delta );

		prevTime = time;

	}

	renderer.render( scene, camera );

}