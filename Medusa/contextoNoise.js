import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {SimplexNoise} from './noise.js';
export class Cn{

    constructor(mundo){
        const geometry = new THREE.BufferGeometry();
        this.noise = new SimplexNoise();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array( [
            -1.0, -1.0,  0.0,
             1.5, 0.0,  0.0,
             -1.0,  1.0,  0.0,

        ] );


        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        let min = 1000;
        let max = -1000
        for(let i=0;i<25;i++){
            for(let j=0;j<25;j++){
                let x = THREE.MathUtils.mapLinear(i,0,25,-25,25);
                let y = THREE.MathUtils.mapLinear(j,0,25,-17,17);
                let r = this.noise.noise(x*0.1,y*0.1);
                min = Math.min(r,min);
                max = Math.max(r,max);
                let a = Math.atan2(-y,-x);
                let factor = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)),0,14,1,0),0,1);
                a = THREE.MathUtils.lerp(a,r*Math.PI,factor);//THREE.MathUtils.mapLinear(r,-1,1,-Math.PI,Math.PI);
                const material = new THREE.MeshBasicMaterial( { color: new THREE.Color("rgb("+parseInt((a/Math.PI+1)/2*255)+", 255, 255)") } );
                let mesh = new THREE.Mesh( geometry, material );
                mesh.position.set(x,y,0);
                mesh.rotateZ(a);
                mesh.scale.set(0.5,0.5,0.5);
                mundo.escena.add(mesh);
            }
        }
        console.log(min);
        console.log(max);
    }
}
