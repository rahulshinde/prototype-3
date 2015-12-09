
var camera, scene, renderer;
var geometry, material, mesh;
var controls;

var objects = [];

var raycaster;

var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var click = document.getElementById( 'click' );

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

	click.addEventListener( 'click', function ( event ) {

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

var clock = new THREE.Clock();
var annie;

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

	/////////////////////////////////////
	//A N I M A T E D - T E X T U R E S//
	/////////////////////////////////////
	
	var flagTexture = new THREE.ImageUtils.loadTexture( 'img/sujata-gif-01.png' );
	annie = new TextureAnimator( flagTexture, 19, 2, 38, 75 ); // texture, #horiz, #vert, #total, duration.
	var flagMaterial = new THREE.MeshBasicMaterial( { map: flagTexture, side:THREE.DoubleSide } );

	var flagGeometry = new THREE.PlaneGeometry( 13, 8 );
	var cube1 = new THREE.Mesh( flagGeometry, flagMaterial );
	scene.add( cube1 );
	cube1.position.y = 13;
	cube1.position.z = -10;
	scene.add(cube1);

	////////////////////////
	//////////scene/////////
	////////////////////////

	var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } );

	// W A L L S

	var geometry2 = new THREE.BoxGeometry( 2, 15, 20 );
	var wall1 = new THREE.Mesh( geometry2, material );
	scene.add( wall1 );
	wall1.position.y = 12;
	wall1.position.x = 13.33;
	wall1.position.z = -40;

	var geometry3 = new THREE.BoxGeometry( 10, 15, 2 );
	var wall2 = new THREE.Mesh( geometry3, material );
	scene.add( wall2 );

	wall2.position.x = 9.3;
	wall2.position.y = 12;
	wall2.position.z = -51;

	// S Y M B O L

	var snakeTexture = new THREE.ImageUtils.loadTexture( 'img/snake-01.png' );

	var snakeMaterial = new THREE.MeshBasicMaterial( { map: snakeTexture, side:THREE.DoubleSide } );

	var geometrySnake = new THREE.PlaneGeometry( 12, 7 );
	var snake = new THREE.Mesh( geometrySnake, snakeMaterial );
	scene.add( snake );

	snake.rotation.y = 29.8;

	snake.position.y = 12;
	snake.position.x = 12.2;
	snake.position.z = -40;

	// C O U C H

	// base
	var geometry4 = new THREE.BoxGeometry( 3.5, 0.5, 7 );
	var couchBase = new THREE.Mesh( geometry4, material );
	scene.add( couchBase );

	couchBase.position.x = 10.5;
	couchBase.position.y = 5.9;
	couchBase.position.z = -40;

	// cushions
	var geometry5 = new THREE.CylinderGeometry( .6, .6, 3.2, 7 );
	var cushion1 = new THREE.Mesh( geometry5, material );
	scene.add( cushion1 );

	cushion1.rotation.x = 20.42;

	cushion1.position.x = 11.5;
	cushion1.position.y = 6.8;
	cushion1.position.z = -41.8;

	var cushion2 = new THREE.Mesh( geometry5, material );
	scene.add( cushion2 );

	cushion2.rotation.x = 20.42;

	cushion2.position.x = 11.5;
	cushion2.position.y = 6.8;
	cushion2.position.z = -38.2;

	// legs

	var geometryLeg = new THREE.CylinderGeometry( .1, .05, 1.2, 7 );
	var leg1 = new THREE.Mesh( geometryLeg, material );
	scene.add( leg1 );

	leg1.position.x = 9;
	leg1.position.y = 4.95;
	leg1.position.z = -37;

	var leg2 = new THREE.Mesh( geometryLeg, material );
	scene.add( leg2 );

	leg2.position.x = 9;
	leg2.position.y = 4.95;
	leg2.position.z = -43;

	var leg3 = new THREE.Mesh( geometryLeg, material );
	scene.add( leg3 );

	leg3.position.x = 12;
	leg3.position.y = 4.95;
	leg3.position.z = -43;

	var leg4 = new THREE.Mesh( geometryLeg, material );
	scene.add( leg4 );

	leg4.position.x = 12;
	leg4.position.y = 4.95;
	leg4.position.z = -37;

	// S H E L F

	var geometryShelf = new THREE.BoxGeometry( 5, 0.1, 2 );
	var shelf = new THREE.Mesh( geometryShelf, material );
	scene.add( shelf );

	shelf.position.x = 9;
	shelf.position.y = 9.5;
	shelf.position.z = -49;

	// V A S E


	var points = [];

	points.push( new THREE.Vector3(0.3, 0, 1));
	points.push( new THREE.Vector3(0.2, 0, 1.3));
	points.push( new THREE.Vector3(.9, 0, 2.25));
	points.push( new THREE.Vector3(0.75, 0, 2.85));
	points.push( new THREE.Vector3(0.6, 0, 3.2));
	points.push( new THREE.Vector3(0.45, 0, 3.4));
	points.push( new THREE.Vector3(0.3, 0, 3.5));
	points.push( new THREE.Vector3(0, 0, 3.5));

	var geometryVase = new THREE.LatheGeometry( points );
	var vase1 = new THREE.Mesh( geometryVase, material );
	scene.add( vase1 );

	vase1.rotation.x = 20.42;

	vase1.position.x = 8.5;
	vase1.position.y = 13;
	vase1.position.z = -49;

	// P A P E R

	var paperGroup = new THREE.Group();

	var paperMaterial = new THREE.LineBasicMaterial( { color : 0xffffff } );


	//top
	var curve = new THREE.CubicBezierCurve3(
		new THREE.Vector3( -1.5, 2, 0 ),
		new THREE.Vector3( -1, 1.9, 0 ),
		new THREE.Vector3( -0.45, 2, 0 ),
		new THREE.Vector3( -0.45, 2, 0 )
	);

	var geometryPaper1 = new THREE.Geometry();
	geometryPaper1.vertices = curve.getPoints( 50 );

	var paperTop = new THREE.Line( geometryPaper1, paperMaterial );
	paperGroup.add( paperTop );

	//left
	var curve2 = new THREE.CubicBezierCurve3(
		new THREE.Vector3( -1.5, 2, 0 ),
		new THREE.Vector3( -1.5, 1.7, 0.05 ),
		new THREE.Vector3( -1.5, 1.1, 0.07 ),
		new THREE.Vector3( -1.5, 0.6, 0.6 ),
		new THREE.Vector3( -1.5, 0.6, 0.6 )
	);

	var geometryPaper2 = new THREE.Geometry();
	geometryPaper2.vertices = curve2.getPoints( 50 );

	var paperLeft = new THREE.Line( geometryPaper2, paperMaterial );
	paperGroup.add( paperLeft );

	//right
	var curve3 = new THREE.CubicBezierCurve3(
		new THREE.Vector3( -.45, 2, 0 ),
		new THREE.Vector3( -.45, 1.7, 0.05 ),
		new THREE.Vector3( -.45, 1.1, 0.07 ),
		new THREE.Vector3( -.45, 0.6, 0.6 ),
		new THREE.Vector3( -.45, 0.6, 0.6 )
	);

	var geometryPaper3 = new THREE.Geometry();
	geometryPaper3.vertices = curve3.getPoints( 50 );

	var paperRight = new THREE.Line( geometryPaper3, paperMaterial );
	paperGroup.add( paperRight );

	//bottom
	var curve4 = new THREE.CubicBezierCurve3(
		new THREE.Vector3( -1.5, 0.6, 0.6 ),
		new THREE.Vector3( -1, 0.6, 0.6 ),
		new THREE.Vector3( -0.45, 0.6, 0.6),
		new THREE.Vector3( -0.45, 0.6, 0.6 )
	);

	var geometryPaper4 = new THREE.Geometry();
	geometryPaper4.vertices = curve4.getPoints( 50 );

	var paperBottom = new THREE.Line( geometryPaper4, paperMaterial );
	paperGroup.add( paperBottom );

	scene.add (paperGroup);


	paperGroup.rotation.y = -1;

	paperGroup.position.x = 8.1;
	paperGroup.position.y = 9;
	paperGroup.position.z = -47.9;

	// B O O K S

	var bookGroup = new THREE.Group();

	var bookGeometry1 = new THREE.BoxGeometry( 2, 0.3, 1 );
	var book1 = new THREE.Mesh( bookGeometry1, material );
	bookGroup.add(book1)

	var bookGeometry2 = new THREE.BoxGeometry( 1.75, 0.2, 0.75 );
	var book2 = new THREE.Mesh( bookGeometry2, material );
	book2.position.x = 0.15;
	book2.position.y = 0.3;
	book2.position.z = 0.1;
	bookGroup.add(book2);

	var bookGeometry3 = new THREE.BoxGeometry( 1.75, 0.2, 0.75 );
	var book3 = new THREE.Mesh( bookGeometry3, material );
	book3.position.x = 0.15;
	book3.position.y = 0.5;
	book3.position.z = 0.1;
	bookGroup.add(book3);

	scene.add( bookGroup );

	bookGroup.position.x = 10.5;
	bookGroup.position.y = 9.7;
	bookGroup.position.z = -48.6;








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

		if ( moveForward ) velocity.z -= 100.0 * delta;
		if ( moveBackward ) velocity.z += 100.0 * delta;

		if ( moveLeft ) velocity.x -= 100.0 * delta;
		if ( moveRight ) velocity.x += 100.0 * delta;

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateZ( velocity.z * delta );

		prevTime = time;

	}

	render();		
	update();

}

function render() 
{
	renderer.render( scene, camera );
}

function update()
{
	var delta = clock.getDelta(); 

	annie.update(1000 * delta);
}

function TextureAnimator(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) 
{	
	// note: texture passed by reference, will be updated by the update function.
		
	this.tilesHorizontal = tilesHoriz;
	this.tilesVertical = tilesVert;
	// how many images does this spritesheet contain?
	//  usually equals tilesHoriz * tilesVert, but not necessarily,
	//  if there at blank tiles at the bottom of the spritesheet. 
	this.numberOfTiles = numTiles;
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
	texture.repeat.set( 1 / this.tilesHorizontal, 1 / this.tilesVertical );

	// how long should each image be displayed?
	this.tileDisplayDuration = tileDispDuration;

	// how long has the current image been displayed?
	this.currentDisplayTime = 0;

	// which image is currently being displayed?
	this.currentTile = 0;
		
	this.update = function( milliSec )
	{
		this.currentDisplayTime += milliSec;
		while (this.currentDisplayTime > this.tileDisplayDuration)
		{
			this.currentDisplayTime -= this.tileDisplayDuration;
			this.currentTile++;
			if (this.currentTile == this.numberOfTiles)
				this.currentTile = 0;
			var currentColumn = this.currentTile % this.tilesHorizontal;
			texture.offset.x = currentColumn / this.tilesHorizontal;
			var currentRow = Math.floor( this.currentTile / this.tilesHorizontal );
			texture.offset.y = currentRow / this.tilesVertical;
		}
	};
}