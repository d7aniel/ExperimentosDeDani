import {Vector3,MathUtils} from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {CENTRO,MAXVEL} from './constantes.js'
import {Buscar} from'./comportamientos/buscar.js';
import {Huir} from'./comportamientos/huir.js';
import {Flow} from'./comportamientos/flow.js';
export class Particula{

    constructor(pos){
        this.accel = new Vector3();
        this.vel = new Vector3();
        this.pos = new Vector3();
        this.busqueda = new Buscar();
        this.huir = new Huir();
        this.flow = new Flow();
        this.usaVertices = false;
        //this.maxvel = 0.05;
        //this.maxfuerza = 0.03;
/*
        this.destino;



        this.usarNoise = false;


        this.phi = 0;


        this.noBuscar = false;*/
    }
    setPosicion(pos){
        this.pos = pos;
    }
    setVertice(array,indice){
        this.usaVertices = true;
        this.array = array;
        this.indice = indice;
        let x = this.array[indice*3];
        let y = this.array[indice*3+1];
        let z = this.array[indice*3+2];
        this.pos.set(x,y,z);
    }

    aplicarFlow(modelotest){
        this.aplicarFuerza(this.flow.get(this.pos,this.vel,modelotest));
    }
    buscar(pos_objetivo){
        this.aplicarFuerza(this.busqueda.get(this.pos,pos_objetivo,this.vel));
    }
    mover(){
        this.vel.add(this.accel);
        this.vel.clampLength(0,MAXVEL);
        this.pos.add(this.vel);
        this.accel.multiplyScalar(0);
        if(this.usaVertices){
            this.array[this.indice*3]=this.pos.x;
            this.array[this.indice*3+1]=this.pos.y;
            this.array[this.indice*3+2]=this.pos.z;
        }
    }

  aplicarFuerza(f) {
    this.accel.add(f);
  }

    /*setDestino(dest){
        this.destino = dest;
    }



    actualizarAutomatico(){
        if(this.destino != undefined){
            this.aplicarFuerza(this.buscar(this.destino,0.5));
            this.aplicarFuerza(this.separar(this.destino));
            this.vel.add(this.accel);
            this.vel.clampLength(0,this.maxvel);
            this.pos.add(this.vel);
            this.accel.multiplyScalar(0);
            if(this.usaVertices){
                this.array[this.indice*3]=this.pos.x;
                this.array[this.indice*3+1]=this.pos.y;
                this.array[this.indice*3+2]=this.pos.z;
            }
        }
        //console.log(this.pos);
    }*/

    /*actualizar(){
        if(this.destino != undefined){
            this.aplicarFuerza(this.buscar(this.destino,0.5));
            this.aplicarFuerza(this.separar(this.destino));
            this.vel.add(this.accel);
            this.vel.clampLength(0,this.maxvel);
            this.pos.add(this.vel);
            this.accel.multiplyScalar(0);
            if(this.usaVertices){
                this.array[this.indice*3]=this.pos.x;
                this.array[this.indice*3+1]=this.pos.y;
                this.array[this.indice*3+2]=this.pos.z;
            }
        }
        //console.log(this.pos);
    }*/

    /*actualizarNoise(){
        if(!this.usarNoise){
            this.usarNoise = true;
            this.destino = new Vector3(0,0,0);
        }
    //    console.log(this.noise.noise(this.pos.x,this.pos.y));
    // θ ∈ [0, π], φ ∈ [0, 2π)    console.log(this.noise.noise(this.pos.x,this.pos.z));
    let r = this.noise.noise(this.pos.x*0.1,this.pos.y*0.1);
    //this.phi = MathUtils.mapLinear(this.noise.noise(this.pos.x,this.pos.y),0,1,-Math.PI,Math.PI);
    //    console.log(this.phi);
    let a = Math.atan2(-this.pos.y,-this.pos.x);
    let factor = MathUtils.clamp(MathUtils.mapLinear(Math.sqrt(Math.pow(this.pos.x,2)+Math.pow(this.pos.y,2)),0,14,1,0),0,1);
    //console.log(factor);
    this.phi = MathUtils.lerp(a,r*Math.PI,factor);

        let theta = 0;
        let radio = 0.1;
        let x = radio*Math.cos(this.phi);//radio*Math.cos(this.phi)*Math.sin(theta);
        let y = radio*Math.sin(this.phi);//radio*Math.sin(this.phi)*Math.sin(theta);
        let z = 0;//radio*Math.cos(theta);
        this.fuerza = MathUtils.clamp(MathUtils.mapLinear(this.pos.distanceToSquared(CENTRO),0,200,0.7,0.2),0.21,0.7);
        this.destino.add(new Vector3(x,y,z));//this.pos.x,this.pos.y,this.pos.z);
        //this.destino.add(new Vector3(x*this.fuerza,y*this.fuerza,z*this.fuerza));

    //if(!this.noBuscar){
        this.aplicarFuerza(this.buscar(this.destino,1.0));
    //}

        this.vel.add(this.accel);
        this.vel.clampLength(0,this.maxvel);
        this.pos.add(this.vel);
        this.accel.multiplyScalar(0);
        if(this.usaVertices){
            this.array[this.indice*3]=this.pos.x;
            this.array[this.indice*3+1]=this.pos.y;
            this.array[this.indice*3+2]=this.pos.z;
        }


        //this.aplicarFuerza(new Vector3());
    }



    buscar(objetivo,fuerza) {
      let conduccion = new Vector3();
      conduccion.subVectors(objetivo, this.pos);
      conduccion.normalize();
      conduccion.multiplyScalar(this.maxvel);
      conduccion.sub(this.vel);
      conduccion.clampLength(0,this.maxfuerza);
      conduccion.multiplyScalar(fuerza);
      return conduccion;
  }

  separar(objetivo) {
    let separacionDeseada = 0.52;
    let conduccion = new Vector3();
    let d = this.pos.distanceTo(objetivo);
    if ((d > 0) && (d < separacionDeseada)) {
        conduccion.subVectors(this.pos, objetivo);
        conduccion.normalize();
        conduccion.divideScalar(d);
    }

    if (conduccion.lengthSq() > 0) {
      conduccion.multiplyScalar(this.maxvel);
      conduccion.sub(this.vel);
      conduccion.clampLength(0,this.maxfuerza);
    }
    return conduccion;
  }
*/
}
