import * as THREE from "https://unpkg.com/three@0.122.0/build/three.module.js";
// import { lista } from "./lista.js";
// import { texto } from "./texto.js";
// import { cargarModelo, setTextura } from "./CargarModelo.js";
// import { cargarColibri } from "./Colibri.js";
// import { cargarFlor } from "./Flor.js";
import { cargarGotas, actualizarGotas } from "./Gotas.js";
// import { Particula } from "./Particula.js";
console.log("v.1");
let d = 60;
var poss = [
  new THREE.Vector2(0, 0),
  new THREE.Vector2(d, d),
  new THREE.Vector2(-d, d),
  new THREE.Vector2(d, -d),
  new THREE.Vector2(-d, -d),
  new THREE.Vector2(d, 0),
  new THREE.Vector2(-d, 0),
  new THREE.Vector2(0, -d),
  new THREE.Vector2(0, d),
];

let gotasCubes;
let gotasCubes2;
let tiempo = 0;
// console.log(texto);

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color(0xeeeeee);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 21;
camera.position.x = 10;
camera.position.y = -20;

let rotationMatrix = new THREE.Matrix4();
let targetQuaternion = new THREE.Quaternion();
rotationMatrix.lookAt(camera.position, new THREE.Vector3(), camera.up);
// console.log(rotationMatrix);
targetQuaternion.setFromRotationMatrix(rotationMatrix);
camera.quaternion.rotateTowards(targetQuaternion, 1.0);

function iluminarConFoto(archivo) {
  let iluminador = new THREE.PMREMGenerator(renderer);
  iluminador.compileEquirectangularShader();
  let escena = scene;
  new THREE.TextureLoader().load(archivo, function (texture) {
    var texturaCielo = iluminador.fromEquirectangular(texture);
    //escena.background = texturaCielo.texture;
    escena.environment = texturaCielo.texture;
    texture.dispose();
    iluminador.dispose();
  });
  // let light = new THREE.DirectionalLight(0xffffff);
  // light.position.set(0.5, 0.5, -10);
  // scene.add(light);

  // let pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(0, 0, 100);
  // scene.add(pointLight);

  let ambientLight = new THREE.AmbientLight(0x333333);
  scene.add(ambientLight);
}
iluminarConFoto("./hdr/fondoRedu.png", false);

let tamGaleriaAjustado = false;
let a = 0;
const rainbow2 = [new THREE.Color(0x0000fe), new THREE.Color(0x000000), new THREE.Color(0xffffff)];
const rainbow1 = [new THREE.Color(0xff0000), new THREE.Color(0x005500), new THREE.Color(0x005500), new THREE.Color(0x0000fe)];
function render(time) {
  if (gotasCubes != null && gotasCubes != undefined) {
    const delta = clock.getDelta();
    tiempo += delta * 0.5;
    actualizarGotas(gotasCubes, tiempo, 17, false, false, false, rainbow1);
  }
  if (gotasCubes2 != null && gotasCubes2 != undefined) {
    const delta = clock.getDelta();
    tiempo += delta * 0.5;
    actualizarGotas(gotasCubes2, tiempo, 17, false, false, false, rainbow2);
  }
  a += 0.01;
  // console.log(a);
  // camera.position.z = Math.cos(a) * 25;
  // camera.position.x = Math.sin(a) * 25;
  // camera.position.y = 0;
  camera.position.z = 25;
  camera.position.x = 0;
  camera.position.y = 0;

  let rotationMatrix = new THREE.Matrix4();
  let targetQuaternion = new THREE.Quaternion();
  rotationMatrix.lookAt(camera.position, new THREE.Vector3(), camera.up);
  // console.log(rotationMatrix);
  targetQuaternion.setFromRotationMatrix(rotationMatrix);
  camera.quaternion.rotateTowards(targetQuaternion, 1.0);
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

async function setupObjects() {
  let gotas = new THREE.Object3D();
  let gotas2 = new THREE.Object3D();
  gotasCubes = await cargarGotas(gotas, -0.5);
  gotasCubes2 = await cargarGotas(gotas, 0.5);
  scene.add(gotas);
  scene.add(gotas2);

  console.log(gotasCubes);
}

setupObjects();

requestAnimationFrame(render);
