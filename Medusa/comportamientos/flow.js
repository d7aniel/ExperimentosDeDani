import {Quaternion,Vector3,MathUtils} from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {MAXVEL,noise,MAXFURZA} from '../constantes.js'
import {Buscar} from './buscar.js'
export class Flow{
    constructor(){
        //this.fuerza = new Vector3();
        //this.flow = new Vector3();
        this.objetivo = new Vector3();
        this.vectorFlow = new Vector3();
        this.buscar = new Buscar();
        this.t = 0;
    }
    get(pos_actual,vel_actual,modelotest){
        let radioEsfera = 20;

        let thetaCalc = Math.acos(pos_actual.z/radioEsfera)
        let phiCalc = Math.atan2(pos_actual.y,pos_actual.x)
        phiCalc = phiCalc>0?phiCalc:phiCalc+Math.PI*2;
        phiCalc%=(Math.PI*2);
        let x = radioEsfera*Math.sin(thetaCalc)*Math.cos(phiCalc);
        let y = radioEsfera*Math.sin(thetaCalc)*Math.sin(phiCalc);
        let z = radioEsfera*Math.cos(thetaCalc);

        let ax = (Math.atan2(z,x)+Math.PI)/(Math.PI*2);
        let ay = (Math.atan2(y,x)+Math.PI)/(Math.PI*2);

        this.t+=0.01;
        let xyvectorFlow = this.noiseAngulo(thetaCalc,phiCalc,this.t);
        this.vectorFlow.set(0,xyvectorFlow[0],xyvectorFlow[1]);
        //console.log(this.vectorFlow);
        const quaternion = new Quaternion();
        quaternion.setFromAxisAngle( this.vectorFlow, MAXVEL );

        this.objetivo.set(x,y,z);
        //const vector = new THREE.Vector3( 1, 0, 0 );
        this.objetivo.applyQuaternion( quaternion );
/*
        //phiCalc+=0.01;
        let dtheta =
        thetaCalc+=0.01;
        phiCalc = phiCalc>0?phiCalc:phiCalc+Math.PI*2;*/

//        console.log(thetaCalc,phiCalc);
    //    1.3419745658701911
        //7.625159873049777
        //console.log(phiCalc)

        //let dTheta = thetaCalc>0?0.01:-0.01;

        //phiCalc+=0.1;
        //console.log(phiCalc);
        //phiCalc = (phiCalc+Math.PI*2)%(Math.PI*2);

    //    phiCalc = (phiCalc+Math.PI*2)%(Math.PI*2);
        //phiCalc+=0.1;
        //thetaCalc%=Math.PI
        /*let movi = this.noiseAngulo(thetaCalc,phiCalc);
        let theta = movi[0];//Math.random(Math.PI);
        let phi = movi[1];//Math.random(Math.PI*2);*/
        /**/


        // this.flow.set(MAXVEL*Math.cos(angulo),MAXVEL*Math.sin(angulo),0);
        return this.buscar.get(pos_actual,this.objetivo,vel_actual);
        // this.objetivo.add(this.flow);
        // this.flow.sub(vel_actual);
        // this.flow.clampLength(0,MAXFURZA);


        /*


        /*this.fuerza.set(0,0,0);
        this.fuerza.subVectors(pos_objetivo,pos_actual);
        this.fuerza.setLength(MAXVEL);
        this.fuerza.sub(vel_actual);
        this.fuerza.clampLength(0,MAXFURZA);*/
        //return this.flow;
    }

    noiseAngulo(x, y, t) {
      let a = 0;
      let ratio = 1;
      let init_nx = noise.noise(0*ratio,y*ratio);
      let init_ny = noise.noise(x*ratio,0*ratio);
      a = noise.noise3d(x*ratio, y*ratio,t);
      let ax = MathUtils.mapLinear(x,0,1,a,init_nx);
      let ay = MathUtils.mapLinear(y,0,1,a,init_ny);

      return [Math.cos(a),Math.sin(a)];//Math.atan2(-Math.sin(ay),-Math.cos(ax))+Math.PI;
    }

}
