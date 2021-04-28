import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
/**
 * Base
 */
// Debug
//const gui = new dat.GUI();

let controller1, controller2;
let controllerGrip1, controllerGip2;
let tempMatrix = new THREE.Matrix4();
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

const metcatText7 = textureLoader.load("/textures/matcaps/7.png");
const matcat2 = textureLoader.load("textures/matcaps/2.png");
const matcat3 = textureLoader.load("textures/matcaps/3.png");
const matcat4 = textureLoader.load("textures/matcaps/4.png");

const mat44 = new THREE.MeshMatcapMaterial({
  matcap: matcat4
});
const mat55 = new THREE.MeshMatcapMaterial({
  matcap: metcatText7
});
const mat22 = new THREE.MeshMatcapMaterial({
  matcap: matcat2
});

const particleTexture = textureLoader.load("/particles/1.png");

//pendents

const loader = new STLLoader();
loader.load("/pendents/AJS.stl", function(pen1Geo) {
  const mesh = new THREE.Mesh(pen1Geo, mat55);
  mesh.position.set(-8, -4, -25);
  mesh.scale.set(0.15, 0.15, 0.15);
  mesh.quaternion.y = Math.PI * 0.1;
  scene.add(mesh);
});

loader.load("pendents/node.stl", p2geo => {
  const mesh = new THREE.Mesh(p2geo, mat55);
  mesh.position.set(-12, -10, -8);
  mesh.scale.set(0.05, 0.05, 0.05);
  mesh.quaternion.y = Math.PI * 0.15;

  scene.add(mesh);
});

loader.load("pendents/java.stl", p3geo => {
  const mesh = new THREE.Mesh(p3geo, mat55);
  mesh.position.set(-8, 0, -10);
  mesh.scale.set(0.1, 0.1, 0.1);
  mesh.quaternion.y = Math.PI * 0.1;
  scene.add(mesh);
});
loader.load("pendents/unity.stl", p4geo => {
  const mesh = new THREE.Mesh(p4geo, mat55);
  mesh.position.set(-16, -8, -6);
  mesh.quaternion.x = Math.PI * 0.2;
  mesh.quaternion.y = -Math.PI * 0.1;

  mesh.rotation.y = -(Math.PI - 0.2) * 1;

  mesh.scale.set(0.2, 0.2, 0.2);

  scene.add(mesh);
});

loader.load("pendents/php_logo.stl", p5geo => {
  const mesh = new THREE.Mesh(p5geo, mat55);
  mesh.position.set(-10, 20, -30);
  mesh.quaternion.y = Math.PI * 0.1;
  mesh.scale.set(0.2, 0.2, 0.2);

  scene.add(mesh);
});
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

  const material3 = new THREE.MeshMatcapMaterial({
    matcap: metcatText7
  });
  const material = new THREE.MeshNormalMaterial({
    wireframe: true
  });
  const material2 = new THREE.MeshMatcapMaterial({
    matcap: matcat4,
    wireframe: true
  });
  const colorArr = [0x93dfd5, 0x8fb8e7, 0xc5c7c8, 0xf2e0b9, 0x63cec4];

  const mat4 = new THREE.MeshBasicMaterial({
    color: colorArr[0],
    wireframe: true
  });

  const text = new THREE.Mesh(textGeometry, material2);
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
    const donut = new THREE.Mesh(donutGeometry, mat4);
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
  const mat2 = new THREE.MeshMatcapMaterial({
    matcap: matcat4
  });
  const devText = new THREE.Mesh(devTextGeo, mat2);
  devText.position.z = -3;
  devText.quaternion.y = -Math.PI * 0.04;
  scene.add(devText);
});

/**
 * Object
 */

//const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));

//scene.add(cube);

///particles
const particleGeo = new THREE.BufferGeometry();
const count = 1750;
///times 3 cuz its x, y ,z ya... like 3 values are needed for 1 particle
const partPos = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  //assigns the values to be normalized and random for each x, y ,z  now.
  partPos[i] = (Math.random() - 0.5) * 30;
}
// create the three,js bufferattribute we named it position and specify that each node is composed of three values,
particleGeo.setAttribute("position", new THREE.BufferAttribute(partPos, 3));
const partMat = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true,
  color: new THREE.Color("#02e0b9"),
  transparent: true,
  alphaMap: particleTexture,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particleGeo, partMat);
scene.add(particles);

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
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

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
  const mat2 = new THREE.MeshMatcapMaterial({
    matcap: matcat4
  });
  const workText = new THREE.Mesh(workTextGeo, mat2);

  workText.position.y = -3;
  workText.position.x = -2;
  workText.position.z = -3;
  workText.quaternion.x = -Math.PI * 0.05;
  scene.add(workText);

  //raycasy
  const ray1 = new THREE.Raycaster();
  const ray2 = new THREE.Raycaster();

  //get mouse
  const mouse = new THREE.Vector2();

  window.addEventListener("mousemove", event => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
  });
  var currentIntersect = null;
  var currentIntersect2 = null;

  window.addEventListener("click", () => {
    if (currentIntersect) {
      switch (currentIntersect.object) {
        case workText:
          console.log("view work clicked");
          location.replace("https://jsrtechnologies-10ac4.web.app/alt-home");
          break;
      }
    }
  });

  const touch = new THREE.Vector2();

  window.addEventListener("touchstart", event => {
    //cashe x snd y touchss

    touch.x = (event.touches[0].clientX / sizes.width) * 2 - 1;
    touch.y = -(event.touches[0].clientY / sizes.height) * 2 + 1;

    // console.log(touch);
  });

  window.addEventListener("touchend", event => {
    touch.x = (event.changedTouches[0].clientX / sizes.width) * 2 - 1;

    touch.y = -(event.changedTouches[0].clientY / sizes.height) * 2 + 1;

    console.log(touch);

    if (currentIntersect2) {
      switch (currentIntersect2.object) {
        case workText:
          //console.log("worktext TAPPED");
          location.replace("https://jsrtechnologies-10ac4.web.app/alt-home");
          break;
      }
    }
  });

  renderer.setAnimationLoop(() => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls

    controls.update();

    //test rayhit
    ray1.setFromCamera(mouse, camera);
    ray2.setFromCamera(touch, camera);

    //const objsToTest = [viewWorkObj];
    const ray1Inter = ray1.intersectObject(workText);
    const ray2inter = ray2.intersectObject(workText);

    ray1Inter.forEach(obj => {
      //console.log(obj.object);
    });

    if (ray1Inter.length) {
      if (currentIntersect === null) {
        console.log("mouseEnterd");
      }
      currentIntersect = ray1Inter[0];
    } else {
      if (currentIntersect) {
        console.log("mouse left");
      }
      currentIntersect = null;
    }

    if (ray2inter.length) {
      if (currentIntersect2 === null) {
        //tapenter? lol
      }
      currentIntersect2 = ray2inter[0];
      console.log("somethins in ray2inter");
    } else {
      if (currentIntersect2) {
        //tap left?? lol
      }
      currentIntersect2 = null;
    }

    ///camera
    camera.position.y = Math.sin(elapsedTime * 0.2);
    camera.position.x = Math.cos(elapsedTime * 0.2);

    //camera.position.z = 3 * 10;

    // Render
    renderer.render(scene, camera);
  });
});
