//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var mesh1,
	mesh2,
	mesh3,
	mesh4;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotationSpeed = 0.001;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'three-container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth*0.7 / window.innerHeight, 1, 1000 );
	camera.position.z = 125;

	var cameraControls;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth*0.7, window.innerHeight );
	container.appendChild( renderer.domElement );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 30;
	cameraControls.update();

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	lightGroup = new THREE.Group();


	//orange
	light1 = new THREE.PointLight( 0xf4bd82, 1, 4500 );
	// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf4bd82 } ) ) );
	light1.position.set( -40, 0, -10 );

	lightGroup.add( light1 );
	// scene.add( light1 );

	//pink
	light2 = new THREE.PointLight( 0xfc86a8, 1, 4500 );
	// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf482c6 } ) ) );
	light2.position.set( 40, 30, -30 );

	lightGroup.add( light2 );
	// scene.add( light2 );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	// directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	directionalLight.position.set( 0, 1, -10 );

	lightGroup.add( directionalLight );
	// scene.add( directionalLight )

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	// directionalLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffffff } ) ) );
	directionalLight2.position.set( 0, 1, 40 );

	lightGroup.add( directionalLight2 );
	// scene.add( directionalLight2 )

	scene.add ( lightGroup );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	// adding main shapes

	group = new THREE.Group();
	//shape1 (semicircle-triangle)

	var shape1 = new THREE.Shape();

	shape1.moveTo( 0, 0 );
	shape1.bezierCurveTo( 0, 10, 10, 10, 10, 10 );
	shape1.bezierCurveTo( 10, 10, 20, 10, 20, 0 );
	shape1.bezierCurveTo( 20, 0, 28, 8, 28, 8 );
	shape1.bezierCurveTo( 28, 8, 30, 10, 32, 8 );
	shape1.bezierCurveTo( 32, 8, 40, 0, 40, 0 );

	var extrudeSetting1 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh1.scale.set(2.1,2.1,2.1);

	mesh1.position.x = -10;
	mesh1.position.y = 10;
	mesh1.position.z = -30;
	mesh1.rotation.y = -0.9;
	mesh1.rotation.x = -0.3;

	group.add( mesh1 );

	//shape2 (character1)
	var shape2 = new THREE.Shape();

	shape2.moveTo( -6, 0 );
	shape2.bezierCurveTo( -6, 0, 20, 0, 20, 0 );
	shape2.bezierCurveTo( 20, 0, 10, 6, 20, 22 );
	shape2.bezierCurveTo( 30, 33, 40, 35, 52, 22 );
	shape2.bezierCurveTo( 55, 17, 58, 3, 48, 7 );
	shape2.bezierCurveTo( 48, 7, 70, 7, 80, 7 );
	shape2.bezierCurveTo( 60, 7, 55, -35, 55, -45 );
	shape2.bezierCurveTo( 55, -45, 15, -45, 15, -45 );
	shape2.bezierCurveTo( 15, -35, 0, -20, -6, -20 );

	var extrudeSetting2 = { amount: 15 };

	var geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSetting2 );

	mesh2 = new THREE.Mesh( geometry2, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh2.scale.set(0.4,0.4,0.4);
	mesh2.position.x = -50;
	mesh2.position.z = -50;
	mesh2.rotation.y = 0.3;
	mesh2.rotation.x = 0.2;
	mesh2.rotation.z = 0.2;

	group.add( mesh2 );

	//shape3 (mask1)
	var shape3 = new THREE.Shape();

	shape3.moveTo( 0, 0 );
	shape3.bezierCurveTo( 0, 0, 3, -5, 15, -5 );
	shape3.bezierCurveTo( 23, -5, 30, 0, 30, 0 );
	shape3.bezierCurveTo( 30, 0, 30, -10, 30, -20 );
	shape3.bezierCurveTo( 30, -30, 26, -27, 26, -27 );
	shape3.bezierCurveTo( 26, -27, 26, -27, 24, -24 );
	shape3.bezierCurveTo( 28, -15, 13, -10, 14, -24 );
	shape3.bezierCurveTo( 15, -30, 22, -26, 21, -25 );
	shape3.bezierCurveTo( 5, -50, 0, -24, 0, -24 );

	var extrudeSetting3 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry3 = new THREE.ExtrudeGeometry( shape3, extrudeSetting3 );

	mesh3 = new THREE.Mesh( geometry3, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh3.scale.set(1.5,1.5,1.5);
	mesh3.position.x = -40;
	mesh3.position.z = 30;
	mesh3.rotation.x = 0.5;
	mesh3.rotation.y = 0.2;

	group.add( mesh3 );

	//shape4 (mountain)
	var shape4 = new THREE.Shape();

	shape4.moveTo( 0, 0 );
	shape4.bezierCurveTo( 0, 0, 20, 0, 22, 20 );
	shape4.bezierCurveTo( 22, 20, 24, 7, 27, 11 );
	shape4.bezierCurveTo( 31, 15, 32, 23, 37, 27 );
	shape4.bezierCurveTo( 37, 27, 36, 9, 47, 0 );

	var extrudeSetting4 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry4 = new THREE.ExtrudeGeometry( shape4, extrudeSetting4 );

	mesh4 = new THREE.Mesh( geometry4, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );

	mesh4.position.x = 45;
	mesh4.position.y = -35;
	mesh4.position.z = -30;
	mesh4.rotation.x = -0.5;
	mesh4.rotation.y = 0.5;
	mesh4.rotation.z = 1.8;

	group.add( mesh4 );

	scene.add( group );

	/////////////////////
	////adding walls/////
	/////////////////////

	//wall 1

	var wall1Group = new THREE.Group();

	var geometry4 = new THREE.BoxGeometry( 60, 42, 1 );
	var wallMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } );
	var wall1 = new THREE.Mesh( geometry4, wallMaterial );

	wall1Group.add( wall1 );

	var imageFrame = new THREE.BoxGeometry( 40, 28, 0.1 );
	var image1Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/1/1.jpg') , side: THREE.DoubleSide} );
	var image1 = new THREE.Mesh( imageFrame, image1Material );

	image1.position.y = 2;
	image1.position.z = 0.5;

	wall1Group.add( image1 );

	wall1Group.position.x = -40;
	wall1Group.position.z = -16;
	wall1Group.rotation.y = 0.8;


	scene.add(wall1Group);

	//wall 2

	var wall2Group = new THREE.Group();

	var geometry5 = new THREE.BoxGeometry( 25, 18, 1 );
	var wall2 = new THREE.Mesh( geometry5, wallMaterial );

	wall2Group.add( wall2 );

	var image2Frame = new THREE.BoxGeometry( 15, 10, 0.1 );
	var image2Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/1/2.jpg') , side: THREE.DoubleSide} );
	var image2 = new THREE.Mesh( image2Frame, image2Material );

	image2.position.y = 1;
	image2.position.z = 0.5;

	wall2Group.add( image2 );


	scene.add(wall2Group);
	wall2Group.position.x = 30;
	wall2Group.position.y = -20;
	wall2Group.position.z = 30;
	wall2Group.rotation.x = -1.5;
	wall2Group.rotation.y = -1;
	wall2Group.rotation.z = -1.5;

	//wall 3

	var wall3Group = new THREE.Group();

	var geometry6 = new THREE.BoxGeometry( 46, 27, 1 );
	var wall3 = new THREE.Mesh( geometry6, wallMaterial );

	wall3Group.add( wall3 );

	var image3Frame = new THREE.BoxGeometry( 30,18, 0.1 );
	var image3Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/1/3.jpg') , side: THREE.DoubleSide} );
	var image3 = new THREE.Mesh( image3Frame, image3Material );

	image3.position.y = 1;
	image3.position.z = 0.5;

	wall3Group.add( image3 );

	wall3Group.position.x = 25;
	wall3Group.position.y = 20;
	wall3Group.position.z = -25;
	wall3Group.rotation.y = 2.5;
	wall3Group.rotation.x = -0.2;


	scene.add(wall3Group);

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {

	lightGroup.rotation.x += rotationSpeed;
	lightGroup.rotation.y += rotationSpeed;
	lightGroup.rotation.z += rotationSpeed;

	renderer.render(scene, camera);
};
