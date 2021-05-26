// @ts-nocheck
import './style.css' 
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30)

renderer.render(scene,camera)

// torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({
  color: 0xFF6347
})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

// lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const controls = new OrbitControls(camera, renderer.domElement)

// stars
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
    color: 0xFF6347
  })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] =
    Array(3).fill().map(() =>
      THREE.MathUtils.randFloatSpread(100)
    )

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// space background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// avatar cube
const ianTexture = new THREE.TextureLoader().load('ian.png')
const ian = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({
    map: ianTexture
  })
)
scene.add(ian)

// moon sphere
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture
  })
)
moon.position.z = 30
moon.position.x = (-10)
scene.add(moon)

// scroll animation
function moveCamera() {
  const top = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  ian.rotation.y += 0.01;
  ian.rotation.z += 0.01;

  camera.position.z = top * -0.01;
  camera.position.x = top * -0.0002;
  camera.position.y = top * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

// animate loop
function animate() {
  requestAnimationFrame( animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  
  controls.update();
  renderer.render(scene,camera)
}
animate();