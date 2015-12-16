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

	};

	var pointerlockerror = function ( event ) {

		instructions.style.display = '';

	};

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

			};

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
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();

function init() {

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );

	scene = new THREE.Scene();

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
	

	////////////////////////
	//////////flag//////////
	////////////////////////

	var flagFrame = new THREE.BoxGeometry( 20,15, 0.1 );
	var flagMaterial = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/2/1.jpg') , side: THREE.DoubleSide} );
	var flag = new THREE.Mesh( flagFrame, flagMaterial );


	scene.add(flag);

	flag.position.x = -15;
	flag.position.y = 10;
	flag.position.z = -18;
	flag.rotation.y = 1.5708;
	flag.scale.set(0.7,0.7,0.7);

	// S C U L P T U R E S

	//shape 1 (leaning figure)
	var shape1 = new THREE.Shape();

	shape1.moveTo( 0, -2 );
	shape1.bezierCurveTo( 0, 0, 8, 4, 10, 6 );
	shape1.bezierCurveTo( 12, 8, 9, 8, 9, 8 );
	shape1.bezierCurveTo( 9, 8, 5, 9, 6, 12 );
	shape1.bezierCurveTo( 8, 14, 11, 15, 11, 14 );
	shape1.bezierCurveTo( 11, 14, 13, 11, 13, 11 );
	shape1.bezierCurveTo( 13, 11, 17, 14, 18, 15 );
	shape1.bezierCurveTo( 21, 21, 17, 10, 17, 10 );
	shape1.bezierCurveTo( 17, 10, 28, 10, 30, 9 );
	shape1.bezierCurveTo( 32, 8, 34, 0, 33, -3 );
	shape1.bezierCurveTo( 32, -8, 31, -5, 30, -4 );
	shape1.bezierCurveTo( 31, -3, 26, 5, 26, 6 );
	shape1.bezierCurveTo( 24, 7, 18, 3, 22, 1 );
	shape1.bezierCurveTo( 25, -2, 27, -5, 27, -5 );
	shape1.bezierCurveTo( 27, -5, 35, -14, 31, -20 );
	shape1.bezierCurveTo( 31, -20, 27, -27, 18, -27 );
	shape1.bezierCurveTo( 18, -27, 15, -27, 16, -26 );
	shape1.bezierCurveTo( 17, -25, 25, -13, 22, -9 );
	shape1.bezierCurveTo( 22, -9, 10, -8, 10, -19 );
	shape1.bezierCurveTo( 10, -19, 2, -18, -3, -21 );
	shape1.bezierCurveTo( -3, -21, -3, -5, 14, -2 );

	var extrudeSetting1 = { amount: 7, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1};

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh1.scale.set(0.1,0.1,0.1);

	scene.add( mesh1 );

	//shape 2 (lightning)
	var shape2 = new THREE.Shape();

	shape2.moveTo( 0, 0 );
	shape2.bezierCurveTo( 0, 0, 2, 2, 2, 4 );
	shape2.bezierCurveTo( 2, 6, 5, 5, 7, 4 );
	shape2.bezierCurveTo( 9, 3, 9, 4, 10, 4 );
	shape2.bezierCurveTo( 11, 4, 10, -4, 8, -6 );
	shape2.bezierCurveTo( 6, -8, 10, -4, 11, -6 );
	shape2.bezierCurveTo( 11, -6, 7, -13, 7, -17 );
	shape2.bezierCurveTo( 7, -17, 1, -18, 1, -18 );
	shape2.bezierCurveTo( 1, -18, 4, -13, 4, -11 );
	shape2.bezierCurveTo( 4, -11, 0, -12, 0, -12 );
	shape2.bezierCurveTo( 4, -11, -1, -13, -1, -10 );
	shape2.bezierCurveTo( 1, -7, 6, -1, 4, 0 );

	var extrudeSetting2 = { amount: 3, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1};

	var geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSetting2 );

	mesh2 = new THREE.Mesh( geometry2, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh2.scale.set(0.2,0.2,0.2);

	scene.add( mesh2 );


	//shape 3 (mask1)
	var shape3 = new THREE.Shape();

	shape3.moveTo( 0, 0 );
	shape3.bezierCurveTo( 0, 0, -1, 0, 1, 1 );
	shape3.bezierCurveTo( 3, 2, 2, 7, 1, 8 );
	shape3.bezierCurveTo( 0, 10, 2, 11, 3, 10 );
	shape3.bezierCurveTo( 4, 9, 7, 7, 12, 9 );
	shape3.bezierCurveTo( 12, 9, 10, 7, 11, 6 );
	shape3.bezierCurveTo( 11, 5, 14, 2, 13, 0 );
	shape3.bezierCurveTo( 13, 0, 9, 1, 9, -1 );
	shape3.bezierCurveTo( 9, -1, 12, -4, 11, -5 );
	shape3.bezierCurveTo( 9, -5, 3, -7, 4, -6 );
	shape3.bezierCurveTo( 4, -5, 7, 0, 5, 0 );

	var extrudeSetting3 = { amount: 3, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1};

	var geometry3 = new THREE.ExtrudeGeometry( shape3, extrudeSetting3 );

	mesh3 = new THREE.Mesh( geometry3, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh3.scale.set(0.2,0.2,0.2);

	scene.add( mesh3 );

	//shape 4 (gesture1)
	var shape4 = new THREE.Shape();

	shape4.moveTo( 0, 0 );
	shape4.bezierCurveTo( 0, 0, 5, 3, 5, 3 );
	shape4.bezierCurveTo( 5, 3, 1, 5, 1, 5 );
	shape4.bezierCurveTo( 1, 5, 9, 8, 9, 8 );
	shape4.bezierCurveTo( 9, 8, 1, 8, 3, 10 );
	shape4.bezierCurveTo( 4, 12, 7, 14, 9, 11 );
	shape4.bezierCurveTo( 11, 9, 9, 14, 9, 14 );
	shape4.bezierCurveTo( 9, 14, 14, 14, 16, 9 );
	shape4.bezierCurveTo( 16, 9, 23, 11, 30, 9 );
	shape4.bezierCurveTo( 30, 9, 34, 14, 33, 17 );
	shape4.bezierCurveTo( 33, 17, 42, 15, 42, 15 );
	shape4.bezierCurveTo( 42, 15, 38, 7, 33, 4 );
	shape4.bezierCurveTo( 29, 1, 38, 0, 45, 5 );
	shape4.bezierCurveTo( 45, 5, 40, -5, 43, -11 );
	shape4.bezierCurveTo( 43, -11, 36, -12, 36, -12 );
	shape4.bezierCurveTo( 36, -12, 38, -6, 33, -5 );
	shape4.bezierCurveTo( 27, -3, 27, -9, 30, -11 );
	shape4.bezierCurveTo( 33, -12, 17, -17, 13, -15 );
	shape4.bezierCurveTo( 12, -13, 12, -7, 17, -11 );
	shape4.bezierCurveTo( 23, -14, 28, -2, 27, -2 );
	shape4.bezierCurveTo( 26, -1, 23, -2, 23, -2 );
	shape4.bezierCurveTo( 23, -2, 26, 0, 25, 1 );
	shape4.bezierCurveTo( 24, 2, 19, 2, 20, 1 );
	shape4.bezierCurveTo( 20, 2, 20, -1, 20, -1 );
	shape4.bezierCurveTo( 21, -1, 17, -1, 17, -1 );
	shape4.bezierCurveTo( 17, -1, 20, -4, 20, -4 );
	shape4.bezierCurveTo( 20, -4, 15, -4, 15, -4 );
	shape4.bezierCurveTo( 15, -4, 19, -6, 19, -6 );
	shape4.bezierCurveTo( 19, -6, 5, -11, 5, -11 );
	shape4.bezierCurveTo( 5, -11, 15, 5, 11, 4 );
	shape4.bezierCurveTo( 7, 3, 11, 1, 5, 0 );

	var extrudeSetting4 = { amount: 3, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1};

	var geometry4 = new THREE.ExtrudeGeometry( shape4, extrudeSetting4 );

	mesh4 = new THREE.Mesh( geometry4, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh4.scale.set(0.1,0.1,0.1);
	mesh4.position.x = 10;
	mesh4.position.y = 7;
	mesh4.position.z = -20;

	scene.add( mesh4 );

	///////////////////////////
	//////////section1/////////
	///////////////////////////

	var domesticGroup = new THREE.Group();

	var material = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } );

	// W A L L S

	var geometry2 = new THREE.BoxGeometry( 2, 15, 20 );
	var wall1 = new THREE.Mesh( geometry2, material );
	domesticGroup.add(wall1);
	wall1.position.y = 12;
	wall1.position.x = 13.33;
	wall1.position.z = -40;

	var geometry3 = new THREE.BoxGeometry( 10, 15, 2 );
	var wall2 = new THREE.Mesh( geometry3, material );

	wall2.position.x = 9.3;
	wall2.position.y = 12;
	wall2.position.z = -51;

	domesticGroup.add(wall2);

	// P O S T E R S

	var posterTexture1 = new THREE.ImageUtils.loadTexture( 'img/2/2.jpg' );

	var posterMaterial1 = new THREE.MeshBasicMaterial( { map: posterTexture1, side:THREE.DoubleSide } );

	var geometryPoster = new THREE.PlaneGeometry( 4, 6 );
	var poster1 = new THREE.Mesh( geometryPoster, posterMaterial1 );
	domesticGroup.add(poster1);

	poster1.rotation.y = 29.8;
	poster1.position.y = 12;
	poster1.position.x = 12.2;
	poster1.position.z = -42.5;

	var posterTexture2 = new THREE.ImageUtils.loadTexture( 'img/2/3.jpg' );

	var posterMaterial2 = new THREE.MeshBasicMaterial( { map: posterTexture2, side:THREE.DoubleSide } );

	var poster2 = new THREE.Mesh( geometryPoster, posterMaterial2 );
	domesticGroup.add(poster2);

	poster2.rotation.y = 29.8;

	poster2.position.y = 12;
	poster2.position.x = 12.2;
	poster2.position.z = -37.5;

	// C O U C H
	var couchGroup = new THREE.Group();

	// base
	var geometry4 = new THREE.BoxGeometry( 3.5, 0.5, 7 );
	var couchBase = new THREE.Mesh( geometry4, material );
	couchGroup.add(couchBase);

	couchBase.position.x = 10.5;
	couchBase.position.y = 5.9;
	couchBase.position.z = -40;

	// cushions
	var geometry5 = new THREE.CylinderGeometry( .6, .6, 3.2, 7 );
	var cushion1 = new THREE.Mesh( geometry5, material );
	couchGroup.add(cushion1);
	cushion1.rotation.x = 20.42;

	cushion1.position.x = 11.5;
	cushion1.position.y = 6.8;
	cushion1.position.z = -41.8;

	var cushion2 = new THREE.Mesh( geometry5, material );
	couchGroup.add(cushion2);
	cushion2.rotation.x = 20.42;

	cushion2.position.x = 11.5;
	cushion2.position.y = 6.8;
	cushion2.position.z = -38.2;

	// legs

	var geometryLeg = new THREE.CylinderGeometry( .1, .05, 1.2, 7 );
	var leg1 = new THREE.Mesh( geometryLeg, material );
	couchGroup.add(leg1);
	leg1.position.x = 9;
	leg1.position.y = 4.95;
	leg1.position.z = -37;

	var leg2 = new THREE.Mesh( geometryLeg, material );
	couchGroup.add(leg2);
	leg2.position.x = 9;
	leg2.position.y = 4.95;
	leg2.position.z = -43;

	var leg3 = new THREE.Mesh( geometryLeg, material );
	couchGroup.add(leg3);
	leg3.position.x = 12;
	leg3.position.y = 4.95;
	leg3.position.z = -43;

	var leg4 = new THREE.Mesh( geometryLeg, material );
	couchGroup.add(leg4);
	leg4.position.x = 12;
	leg4.position.y = 4.95;
	leg4.position.z = -37;

	domesticGroup.add(couchGroup);

	// S H E L F

	var geometryShelf = new THREE.BoxGeometry( 5, 0.1, 2 );
	var shelf = new THREE.Mesh( geometryShelf, material );
	domesticGroup.add(shelf);
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
	domesticGroup.add(vase1);

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

	domesticGroup.add(paperGroup);


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

	domesticGroup.add(bookGroup);

	bookGroup.position.x = 10.5;
	bookGroup.position.y = 9.7;
	bookGroup.position.z = -48.6;



	scene.add(domesticGroup);

	domesticGroup.position.x = 35;
	domesticGroup.position.z = -30;
	domesticGroup.rotation.y = 1.5708;

	///////////////////////////
	//////////pedestals////////
	///////////////////////////

	var pedestalGroup = new THREE.Group();

	var pedestalGeometry = new THREE.BoxGeometry( 3, 6, 3 );
	var pedestal1 = new THREE.Mesh( pedestalGeometry, material );
	pedestalGroup.add(pedestal1);
	pedestalGroup.add(mesh1);
	pedestal1.position.y = 6;

	mesh1.position.y = 12.8;
	mesh1.position.x = -1;
	mesh1.position.z = 0.3;
	mesh1.rotation.x = 0.4;
	mesh1.rotation.z = -0.6;

	var pedestal2 = new THREE.Mesh( pedestalGeometry, material );
	pedestalGroup.add(pedestal2);
	pedestalGroup.add(mesh2);
	pedestal2.position.x = 8;
	pedestal2.position.y = 6;

	mesh2.position.y = 12.8;
	mesh2.position.x =7.5;
	mesh2.position.z = -2;
	mesh2.rotation.x = -0.6;
	mesh2.rotation.y = -0.6;

	var pedestal3 = new THREE.Mesh( pedestalGeometry, material );
	pedestalGroup.add(pedestal3);
	pedestalGroup.add(mesh3);
	pedestal3.position.x = 8;
	pedestal3.position.y = 6;
	pedestal3.position.z = 8;

	mesh3.position.x = 6.7;
	mesh3.position.z = 8;
	mesh3.position.y = 10;
	mesh3.rotation.x = -1;

	var pedestal4 = new THREE.Mesh( pedestalGeometry, material );
	pedestalGroup.add(pedestal4);
	pedestalGroup.add(mesh4);
	pedestal4.position.y = 6;
	pedestal4.position.z = 8;

	mesh4.position.x = -1.5;
	mesh4.position.z = 6;
	mesh4.position.y = 10.9;
	mesh4.rotation.y = -1;


	scene.add( pedestalGroup );

	pedestalGroup.position.x = 13;
	pedestalGroup.position.z = -23;

	pedestalGroup.rotation.y = -2;

	///////////////////////////
	//////////section2/////////
	///////////////////////////

	var photoGroup = new THREE.Group();

	var wallGeometry1 = new THREE.BoxGeometry( 2, 15, 27 );
	var wall3 = new THREE.Mesh( wallGeometry1, material );

	photoGroup.add(wall3);
	wall3.position.y = 12;
	wall3.position.x = 13.33;
	wall3.position.z = -45;

	var photoTexture1 = new THREE.ImageUtils.loadTexture( 'img/2/4.jpg' );

	var photoMaterial1 = new THREE.MeshBasicMaterial( { map: photoTexture1, side:THREE.DoubleSide } );

	var geometryPhoto = new THREE.PlaneGeometry( 6, 4 );
	var photo1 = new THREE.Mesh( geometryPhoto, photoMaterial1 );
	photoGroup.add(photo1);

	photo1.rotation.y = 29.8;
	photo1.position.y = 12;
	photo1.position.x = 12.2;
	photo1.position.z = -44.7;

	var photoTexture2 = new THREE.ImageUtils.loadTexture( 'img/2/5.jpg' );

	var photoMaterial2 = new THREE.MeshBasicMaterial( { map: photoTexture2, side:THREE.DoubleSide } );
	var photo2 = new THREE.Mesh( geometryPhoto, photoMaterial2 );
	photoGroup.add(photo2);

	photo2.rotation.y = 29.8;
	photo2.position.y = 12;
	photo2.position.x = 12.2;
	photo2.position.z = -53.5;

	var photoTexture3 = new THREE.ImageUtils.loadTexture( 'img/2/6.jpg' );

	var photoMaterial3 = new THREE.MeshBasicMaterial( { map: photoTexture2, side:THREE.DoubleSide } );
	var photo3 = new THREE.Mesh( geometryPhoto, photoMaterial2 );
	photoGroup.add(photo3);

	photo3.rotation.y = 29.8;
	photo3.position.y = 12;
	photo3.position.x = 12.2;
	photo3.position.z = -36.5;


	scene.add(photoGroup);

	photoGroup.position.x = 30;
	photoGroup.position.z = 17;
	photoGroup.rotation.y = 0.4;



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

	// mesh1.rotation.y += 0.003;
	// mesh2.rotation.y += 0.003;
	// mesh3.rotation.y += 0.003;
	// mesh4.rotation.y += 0.003;

	renderer.render( scene, camera );

}

