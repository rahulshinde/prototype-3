var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.LineBasicMaterial( { color:0x404040 } );
var cube = new THREE.Mesh( geometry, material );
var light = new THREE.AmbientLight( 0x404040 );
scene.add( light );
scene.add( cube );

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.1;

	renderer.render(scene, camera);
};

render();