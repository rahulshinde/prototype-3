//general scene variables

console.log((Math.random()*20).toFixed(0));

var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var spinSpeed = 0.002;

//variables for movable light

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

var container = document.getElementById( 'three-container' );

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 125;

	var cameraControls;

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set( 0, 0, 0);
	cameraControls.maxDistance = 400;
	cameraControls.minDistance = 30;
	cameraControls.update();

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x2defff, 1, 4500 );
	// light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xf8ffa8, 1, 4500 );
	// light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 30, 10 );
	scene.add( light2 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	// adding main shapes

	group = new THREE.Group();

	//shape1

	var shape1 = new THREE.Shape();

	shape1.moveTo( 0, 0 );
	shape1.bezierCurveTo( 0, 0, 0, 0, 0, 20 );
	shape1.bezierCurveTo( 0, 20, 10, 40, 20, 20 );
	shape1.bezierCurveTo( 0, 20, 0, 20, 20, 0 );
	shape1.bezierCurveTo( 0, 0, 0, 0, 0, -20 );
	shape1.bezierCurveTo( 0, -40, 0, 0, -30, -20 );
	shape1.bezierCurveTo( 0, 40, -20, 30, 0, 20 );

	var extrudeSetting1 = { amount: 10, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSetting1 );

	var mesh1 = new THREE.Mesh( geometry1, new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } ) );

	mesh1.position.x = -10;
	mesh1.position.z = 30;

	group.add( mesh1 );

	//shape2
	var shape2 = new THREE.Shape();

	shape2.moveTo( 0, 0 );
	shape2.bezierCurveTo( 0, 10, 0, 0, -20, 10 );
	shape2.bezierCurveTo( 0, 0, -10, -10, -30, -10 );
	shape2.bezierCurveTo( 0, -20, -10, -20, 30, 0 );
	shape2.bezierCurveTo( 20, -30, 30, -30, 30, -40 );
	shape2.bezierCurveTo( 50, 40, 45, 50, 20, 20 );
	shape2.bezierCurveTo( 10, 40, 10, 20, 0, 0 );

	var extrudeSetting2 = { amount: 20 };

	var geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSetting2 );

	var mesh2 = new THREE.Mesh( geometry2, new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } ) );

	mesh2.position.x = 20;
	mesh2.position.z = -40;
	mesh2.rotation.y = -0.9;
	mesh2.rotation.x = 0.2;

	group.add( mesh2 );

	//shape3
	var shape3 = new THREE.Shape();

	shape3.moveTo( 0, 0 );
	shape3.bezierCurveTo( 5, 5, 10, 5, 5, 5 );
	shape3.bezierCurveTo( 6, 5, 6, 10, 0, 10 );
	shape3.bezierCurveTo( -10, 10, -10, 12, -10, 8 );
	shape3.bezierCurveTo( -10, 10, -40, -5, 5, -5 );
	shape3.bezierCurveTo( 10, -10, 10, -25, 15, 5 );

	var extrudeSetting3 = { amount: 5, bevelEnabled: true, bevelSegments: 4, steps: 3, bevelSize: 1, bevelThickness: 1 };

	var geometry3 = new THREE.ExtrudeGeometry( shape3, extrudeSetting3 );

	var mesh3 = new THREE.Mesh( geometry3, new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } ) );

	mesh3.position.x = -10;
	mesh3.position.z = -10;
	mesh3.rotation.x = 0.5;
	mesh3.rotation.z = 1.8;

	group.add( mesh3 );

	scene.add( group );

	/////////////////////
	////adding walls/////
	/////////////////////

	//wall 1

	var wall1Group = new THREE.Group();

	var geometry4 = new THREE.BoxGeometry( 60, 40, 1 );
	var wallMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, wireframe: true } );
	var wall1 = new THREE.Mesh( geometry4, wallMaterial );

	wall1Group.add( wall1 );

	var imageFrame = new THREE.BoxGeometry( 35, 25, 0.1 );
	var image1Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/1.jpg') , side: THREE.DoubleSide} );
	var image1 = new THREE.Mesh( imageFrame, image1Material );

	image1.position.y = 2;
	image1.position.z = 0.5;

	wall1Group.add( image1 );


	scene.add(wall1Group);
	wall1Group.position.x = -40;
	wall1Group.rotation.y = 0.8;

	//wall 2

	var wall2Group = new THREE.Group();

	var geometry5 = new THREE.BoxGeometry( 25, 18, 1 );
	var wall2 = new THREE.Mesh( geometry5, wallMaterial );

	wall2Group.add( wall2 );

	var image2Frame = new THREE.BoxGeometry( 15, 10, 0.1 );
	var image2Material = new THREE.MeshBasicMaterial( { map:THREE.ImageUtils.loadTexture('img/2.jpg') , side: THREE.DoubleSide} );
	var image2 = new THREE.Mesh( image2Frame, image2Material );

	image2.position.y = 1;
	image2.position.z = 0.5;

	wall2Group.add( image2 );


	scene.add(wall2Group);
	wall2Group.position.x = 10;
	wall2Group.position.y = -20;
	wall2Group.position.z = 30;
	wall2Group.rotation.x = -1.5;
	wall2Group.rotation.y = -1;
	wall2Group.rotation.z = -1.5;

	group.add (wall1Group);
	group.add (wall2Group);

	window.addEventListener( 'resize', onWindowResize, false );

	window.addEventListener( 'mousedown', onMouseDown, false );
	window.addEventListener( 'mouseup', onMouseUp, false );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseDown() {
	spinSpeed = 0;
}

function onMouseUp() {
	spinSpeed = 0.002;
}

function animate() {

	requestAnimationFrame( animate );
	render();

}	

function render() {

	group.rotation.x += spinSpeed;
	group.rotation.y += spinSpeed;
	group.rotation.z += spinSpeed;


	renderer.render(scene, camera);
};
