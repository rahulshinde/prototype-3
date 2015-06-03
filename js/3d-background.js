var scene,
	camera,
	light1,
	renderer,
	cube;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;

	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x2defff, 2, 9000 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( 50, 30, 40 );
	var material = new THREE.MeshPhongMaterial({color: 0x696969, emissive: 0x696969, specular:0x696969, shininess: 15, side: THREE.DoubleSide});
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

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
	light1.position.x += mouseX / 900;
	light1.position.y += - mouseY / 900;

	console.log(light1.position.x);

	camera.lookAt( scene.position );

	renderer.render(scene, camera);
};
