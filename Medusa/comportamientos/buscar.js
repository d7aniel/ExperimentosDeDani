import {Vector3} from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {MAXVEL,MAXFURZA} from '../constantes.js'
export class Buscar{
    constructor(){
        this.fuerza = new Vector3();
    }
    get(pos_actual,pos_objetivo,vel_actual){
        this.fuerza.set(0,0,0);
        this.fuerza.subVectors(pos_objetivo,pos_actual);
        this.fuerza.setLength(MAXVEL);
        this.fuerza.sub(vel_actual);
        this.fuerza.clampLength(0,MAXFURZA);
        return this.fuerza;
    }
}
