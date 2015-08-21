var scene,
	camera,
	light1,
	light2,
	renderer,
	cube;

var mouseX = 0, mouseY = 0;

var accX,
	accY,
	accZ,
	xA,
	yA,
	zA;

var cubex = .5,
	cubey = 4;
	cubez = .2;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

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

	group = new THREE.Group();
	group.position.y = 50;
	scene.add( group );

	function addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
		var points = shape.createPointsGeometry();
		var spacedPoints = shape.createSpacedPointsGeometry( 50 );

		// 3d shape

		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
		mesh.position.set( x, y, z );
		mesh.rotation.set( rx, ry, rz );
		mesh.scale.set( s, s, s );
		group.add( mesh );

		// vertices from real points

		var pgeo = points.clone();
		var particles = new THREE.PointCloud( pgeo, new THREE.PointCloudMaterial( { color: color, size: 2 } ) );
		particles.position.set( x, y, z + 30 );
		particles.rotation.set( rx, ry, rz );
		particles.scale.set( s, s, s );
		group.add( particles );

		// solid line

		var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
		line.position.set( x, y, z - 30 );
		line.rotation.set( rx, ry, rz );
		line.scale.set( s, s, s );
		group.add( line );


	}

	var objectPts = [];

	objectPts.push( new THREE.Vector2 ( 20, 40 ) );
	objectPts.push( new THREE.Vector2 ( 0, 0 ) );
	objectPts.push( new THREE.Vector2 ( -20, 40 ) );

	for( var i = 0; i < objectPts.length; i ++ ) objectPts[ i ].multiplyScalar( 0.25 );

	var objectShape = new THREE.Shape( objectPts );

	var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

	// addShape( shape, color, x, y, z, rx, ry,rz, s );

	addShape( objectShape,  extrudeSettings, 0xf08000, 0, -20, 0, 0, 0, 0, 1 );

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

function onDocumentMouseMove( event ) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

window.ondevicemotion = function(event) {

    accX = event.acceleration.x;  
    accY = event.acceleration.y;
    accZ = event.acceleration.z;  
		    
    xA = -(accX / 100);
    yA = -(accY / 100);
    zA = -(accZ / 100);

    cubex = cubex + xA;
    cubey = cubey + yA;
    cubez = cubez + zA; 

}

function animate() {

	requestAnimationFrame( animate );

	render();

}	

function render() {
	light1.position.set ( (mouseX - light1.position.x) * 0.075, - (mouseY - light1.position.y) * 0.075, 50);
	console.log(mouseX);
	console.log(light1.position);

	renderer.render(scene, camera);
};
