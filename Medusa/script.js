import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';

import { EffectComposer } from 'https://unpkg.com/three@0.122.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.122.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.122.0/examples/jsm/postprocessing/UnrealBloomPass.js';

import {Mundo} from './Mundo.js';
import {Medusa} from './Medusa.js'
import {Cn} from './contextoNoise.js'
var medusas = [];
var mundo;
var mouseX = 0;
var mouseY = 0;
var cant = 200;
let composer;
function iniciar(){
    mundo = new Mundo();
    mundo.iluminar();
    // mundo.iluminarConFoto('./hdr/fondoRedu.png');
    mundo.crearOrbitControl();

    for(let i=0;i<cant;i++){
        medusas.push(new Medusa(mundo));
    }
    //let cn = new Cn(mundo);

    document.onmousemove = handleMouseMove;
       function handleMouseMove(event) {
           mouseX = (event.clientX/window.innerWidth-0.5)*2;
           mouseY = (event.clientY/window.innerHeight-0.5)*-2;
       }

     /*  const geometry = new THREE.SphereGeometry( 18, 32, 32 );
    const material = new THREE.LineBasicMaterial( {color: 0x00ffff} );
    const sphere = new THREE.Line( geometry, material );
    mundo.escena.add( sphere );*/

                const renderScene = new RenderPass( mundo.escena, mundo.camara );
				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = 0;
				bloomPass.strength = 0.7;
				bloomPass.radius = 0;
                mundo.renderizador.toneMappingExposure = 1;

				composer = new EffectComposer( mundo.renderizador );
				composer.addPass( renderScene );
				composer.addPass( bloomPass );

                window.addEventListener( 'resize', onWindowResize );


}


			function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				mundo.camara.aspect = width / height;
				mundo.camara.updateProjectionMatrix();

				mundo.renderizador.setSize( width, height );
				composer.setSize( width, height );

			}

function animacion(){
    requestAnimationFrame(animacion);
/*    if(cube != undefined){
        cube.rotation.y += 0.05;
        cube.rotation.x += 0.01;
        cube.rotation.z += 0.02;
    }*/
    for(let i=0;i<cant;i++){
        medusas[i].actualizar();
    }
    //mundo.renderizar();
    //stats.update();
	composer.render();
}

iniciar();
//crearCajaDePrueba();
animacion();
