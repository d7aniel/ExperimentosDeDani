import {Vector3} from 'https://unpkg.com/three@0.122.0/build/three.module.js';
import {MAXVEL,MAXFURZA} from '../constantes.js'
import {Buscar} from './buscar.js'
export class Huir{
    constructor(){
        this.buscar = new Buscar();
        this.fuerza;
    }
    get(pos_actual,pos_objetivo,vel_actual){
        this.fuerza = this.buscar.get(pos_actual,pos_objetivo,vel_actual);
        this.fuerza.multiplyScalar(-1);
        return this.fuerza;
    }
}
