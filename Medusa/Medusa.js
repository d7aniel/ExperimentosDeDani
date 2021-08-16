import * as THREE from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {Particula} from'./Particula.js';


export class Medusa{
    constructor(mundo){
        //-----------ParticulaFlow
        this.particulaCuerpo = new Particula();
        let radioEsfera = 20;
        let theta = Math.random()*Math.PI;
        let phi = Math.random()*Math.PI*2;
        console.log(theta,phi);
        let x = radioEsfera*Math.sin(theta)*Math.cos(phi);
        let y = radioEsfera*Math.sin(theta)*Math.sin(phi);
        let z = radioEsfera*Math.cos(theta);
        this.ayudantes = false;
        if(this.ayudantes){
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshStandardMaterial( {color: 0x00ff00} );
            const materialTest = new THREE.MeshStandardMaterial( {color: 0xffff00} );
            this.modelotest = new THREE.Mesh( geometry, materialTest );
            mundo.escena.add(this.modelotest);
            this.modelo = new THREE.Mesh( geometry, material );
            mundo.escena.add(this.modelo);
            this.modelo.position.set(x,y,z);
            this.modelotest.position.set(x,y,z);
            this.particulaCuerpo.setPosicion(this.modelo.position);
        }else{
            this.particulaCuerpo.setPosicion(new THREE.Vector3(x,y,z));
        }
        this.cantVertices = 50;

        //-----------TENTACULOS
        let r = 5;
        let g = parseInt(0+Math.random()*255);
        let b = parseInt(200+Math.random()*5);
        let c = new THREE.Color("rgb("+r+","+g+","+b+")");//""+0+", "+200+Math.random()*55+", "+200+Math.random()*25+")");
       const material_tentaculo = new THREE.LineBasicMaterial({

        	color: c
        });
        const puntos = [];
        for(let i=0;i<this.cantVertices;i++){
            puntos.push( new THREE.Vector3( x, y, z ) );
        }
        const geo_tentaculo = new THREE.BufferGeometry().setFromPoints( puntos );
        this.tentaculo = new THREE.Line( geo_tentaculo, material_tentaculo );
        //this.tentaculo.geometry.attributes.position.setUsage( THREE.DynamicDrawUsage );
        this.particulas = [];
       for(let i=0;i<this.cantVertices;i++){
            this.particulas.push(new Particula());
            this.particulas[i].setVertice(this.tentaculo.geometry.attributes.position.array,i);
            /*//this.d = new THREE.Vector3(2,0,0);
            if(i==0){
                this.particulas[i].setDestino(this.particulaCuerpo.pos);
            }else{
                this.particulas[i].setDestino(this.particulas[i-1].pos);
            }*/
        }
    //    console.log(this.tentaculo.geometry.attributes.position);
        mundo.escena.add( this.tentaculo);


/*this.texto = document.createElement('h2');
document.body.append(this.texto);*/

    }

    actualizar(){
        this.particulaCuerpo.aplicarFlow();
        this.particulaCuerpo.mover();
        if(this.ayudantes){
            this.modelotest.position.set(this.particulaCuerpo.flow.objetivo.x,this.particulaCuerpo.flow.objetivo.y,this.particulaCuerpo.flow.objetivo.z);
        }
        //this.texto.innerText = this.particulaCuerpo.pos.distanceTo(new THREE.Vector3(0,0,0));
                //this.modelotest.position.set(this.particulaCuerpo.destino.x,this.particulaCuerpo.destino.y,this.particulaCuerpo.destino.z);
        //this.particulaCuerpo.actualizar();
      // this.particulas[0].aplicarFlow();
      this.particulas[0].buscar(this.particulaCuerpo.pos);
        for(let i=1;i<this.cantVertices;i++){
            // this.particulas[i].aplicarFlow();
            this.particulas[i].buscar(this.particulas[i-1].pos);//.push(new Particula());
        }
        for(let i=0;i<this.cantVertices;i++){
            this.particulas[i].mover();
        }

        this.tentaculo.geometry.attributes.position.needsUpdate = true;



        /*for(let i=0;i<10;i++){
            puntos.push( new THREE.Vector3( 0, i*-0.2, 0 ) );
        }*/
    }
}
