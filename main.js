import './style.css'
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

//adjeuct the camera
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// render == Draw
renderer.render(scene, camera);


// now add object
const geometry  = new THREE.TorusBufferGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: true });
// now combie the geomtry with the material
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

// function to renderer.render(scene, camera);
function animate(){
  requestAnimationFrame(animate);
  //  create animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;



  renderer.render(scene, camera);

}
animate();




