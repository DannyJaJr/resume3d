import './style.css'
import * as THREE from 'three';

// import the orbitControl class
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



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
const geometry  = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// now combie the geomtry with the material
const torus = new THREE.Mesh( geometry, material);

scene.add(torus)

// create a light directon
const pointLight =  new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lighthelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper, gridHelper)

// using the OrbitControl class for control with the mouse
const controls = new OrbitControls(camera, renderer.domElement);


// populate the canvas
function addStart(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)

}
Array(200).fill().forEach(addStart)

// add an avatar
const danTexture = new THREE.TextureLoader().load('dan.png');
const dan = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: danTexture})
);
scene.add(dan);


// create an moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture,
    // normalMap: normalTexture
    
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

// create a background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;





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




