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

var mouseX = 0, mouseY = 0;

var pts = [];
var closedSpline;

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

	//adding lights, sphere is just to check light position.
	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x2defff, 1, 4500 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xf8ffa8, 1, 4500 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 30, 10 );
	scene.add( light2 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	// adding main object

	group = new THREE.Group();
	scene.add( group );


	function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

		var points = shape.createPointsGeometry();
		var spacedPoints = shape.createSpacedPointsGeometry( 50 );

		// 3d shape

		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
		var material = new THREE.MeshPhongMaterial({transparent:true, opacity: 0.6, color: 0xc38e3c, emissive: 0xc38e3c, specular:0x696969, shininess: 5, side: THREE.DoubleSide});

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( x, y, z);
		mesh.rotation.set( rx, ry, rz );
		mesh.scale.set( s, s, s );
		group.add( mesh );

	}

	// Shape

	pts.push( new THREE.Vector2 ( 20, 30 ) );
	pts.push( new THREE.Vector2 ( -20, 30 ) );
	pts.push( new THREE.Vector2 ( 0, -30 ) );
	pts.push( new THREE.Vector2 ( 10, -30 ) );
	pts.push( new THREE.Vector2 ( 30, 0 ) );

	var shape = new THREE.Shape( pts );

	closedSpline = new THREE.ClosedSplineCurve3( [
		new THREE.Vector3( 0, 0, 0 ),
		new THREE.Vector3( 10, 10, -10 ),
		new THREE.Vector3( 20, -10, -20 ),
		new THREE.Vector3( 0, 0, 0 ),
	] );

	var extrudeSettings = { amount: 100, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1, extrudePath: closedSpline };

	addShape( shape,  extrudeSettings, 0xf08000, 0, 0, 0, 0, 0, 0, 1 );

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
	light1.position.set ( (mouseX - light1.position.x) * 0.075, - (mouseY - light1.position.y) * 0.075, 50);

	group.rotation.x += .002;
	group.rotation.y += .001;

	renderer.render(scene, camera);
};
