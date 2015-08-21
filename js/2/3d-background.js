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

init();
animate();

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 100;

	var sphere = new THREE.SphereGeometry( 0.4, 16, 8 );

	light1 = new THREE.PointLight( 0x2defff, 1, 4500 );
	light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x2defff } ) ) );
	light1.position.set( 0, 0, 50 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0xf8ffa8, 1, 4500 );
	light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xf8ffa8 } ) ) );
	light2.position.set( 10, 0, 50 );
	scene.add( light2 );

	scene.add( new THREE.AmbientLight( 0x000000 ) );

	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry( 50, 30, 40 );
	var material = new THREE.MeshPhongMaterial({color: 0x696969, emissive: 0x696969, specular:0x696969, shininess: 15, side: THREE.DoubleSide});
	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	var geometry2 = new THREE.BoxGeometry( 10, 10, 15 );
	cube2 = new THREE.Mesh( geometry2, material );

	cube.rotation.x = .5;
	cube.rotation.y = 4;

	cube2.position.set( 30, 0, 25 );

	scene.add( cube2 );

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

	light2.position.set ( (mouseX - light1.position.x + 90) * 0.05, - (mouseY - light1.position.y) * 0.05, 50);

        
    cube.rotation.x = cubex;
	cube.rotation.y = cubey;
	cube.rotation.z = cubez;

	



	renderer.render(scene, camera);
};
