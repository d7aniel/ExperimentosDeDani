import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';
import {Mundo} from './Mundo.js';
import {cargarModelo} from './CargarModelo.js';
import {ContextoAR} from './ContextoAR.js';

var modelo;
var mundo;
var contextoAR;
function iniciar(){
    mundo = new Mundo();
    mundo.iluminarConFoto('./hdr/fondoRedu.png');
    contextoAR = new ContextoAR(mundo);

    var descriptorCara = contextoAR.crearDescriptor('./descriptores/cara/cara512','cara');
    modelo = new THREE.Object3D();
    cargarModelo('./modelo/modeloLD.glb',modelo);
    modelo.position.x+=50;
    modelo.position.z-=80;
    modelo.scale.x = 50;
    modelo.scale.y = 50;
    modelo.scale.z = 50;
    descriptorCara.add(modelo);

}

function animacion(){
    requestAnimationFrame(animacion);
/*    if(cube != undefined){
        cube.rotation.y += 0.05;
        cube.rotation.x += 0.01;
        cube.rotation.z += 0.02;
    }*/
    contextoAR.actualizar();
    mundo.dibujar();
}

iniciar();
//crearCajaDePrueba();
animacion();
