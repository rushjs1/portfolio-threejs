import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

//texture
const metcapTexture = textureLoader.load("/textures/matcaps/1.png");

//fonts
const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", font => {
  const textGeometry = new THREE.TextBufferGeometry("John Rush", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });

  /* const material = new THREE.MeshMatcapMaterial({
    matcap: metcapTexture
  }); */
  const material = new THREE.MeshNormalMaterial({
    wireframe: true
  });

  const text = new THREE.Mesh(textGeometry, material);
  //const devText = new THREE.Mesh(devTextGeo, material);

  scene.add(text);
  textGeometry.computeBoundingBox();
  textGeometry.translate(
    -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
    -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
    -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  );
  gsap.to(text.position, {
    duration: 2,
    delay: 0.2,
    z: 10
  });
  gsap.to(text.position, {
    duration: 6,
    delay: 5,
    z: 5
  });
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
  //camera.lookAt(textGeometry.position);
});
fontLoader.load("/fonts/helvetiker_regular.typeface.json", font => {
  const devTextGeo = new THREE.TextBufferGeometry("Creative 3D Developer", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });

  const material = new THREE.MeshNormalMaterial({
    wireframe: true
  });
  const devText = new THREE.Mesh(devTextGeo, material);
  scene.add(devText);
});
fontLoader.load("/fonts/helvetiker_regular.typeface.json", font => {
  const workTextGeo = new THREE.TextBufferGeometry("View My Work", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });

  const material = new THREE.MeshNormalMaterial({
    wireframe: true
  });
  const workText = new THREE.Mesh(workTextGeo, material);

  workText.position.y = -3;
  workText.position.x = -2;
  workText.position.z = -8;
  scene.add(workText);
});

/**
 * Object
 */

//const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));

//scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

gsap.to(camera.position, {
  duration: 4,
  delay: 1,
  z: -13
});
gsap.to(camera.position, {
  duration: 5,
  delay: 4,
  z: 11
});

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls

  controls.update();

  ///camera
  camera.position.y = Math.sin(elapsedTime * 0.2);
  camera.position.x = Math.cos(elapsedTime * 0.2);

  //camera.position.z = 3 * 10;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
