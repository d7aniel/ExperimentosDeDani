class Paleta{
    constructor(){
        this.colores = [];
        this.set();
    }
    set(){
        this.colores = [];
        push();
        colorMode(HSB);
        this.colores = [];
        let d = 30;
        let d2 = 20;
        let d3 = 10;
        let alpha = 0.2;
        let oscuro = random(1)<0.5;
        let brillo = oscuro?random(10,35):random(65,90);
        this.colores.push(color(random(360),random(40,90),brillo,alpha));//random(255),random(0),random(0)));
        let h = hue(this.colores[0])
        let s = saturation(this.colores[0])
        let b = brightness(this.colores[0])
        let brilloCom = oscuro?100:constrain(random(-d3,d3)+b,0,100);
        let satCom = oscuro?100:constrain(random(-d2,d2)+s,0,100);
        this.colores.push(color((180+h)%360,
        satCom,
        brilloCom,alpha));
        for(let i=0;i<4;i++){
            this.colores.push(color((random(-d,d)+h)%360,
            constrain(random(-d2,d2)+s,0,100),
            constrain(random(-d3,d3)+b,0,100),alpha));
        }
        pop();
    }

    get(){
        let cual = parseInt(random(this.colores.length));
        return this.colores[cual]
    }
    getColor(indice){
        return this.colores[indice]
    }
    getFondo(){
        push();
        colorMode(HSB);
        let c = color(hue(this.colores[0]),100-saturation(this.colores[0]),100-brightness(this.colores[0]));
        pop();
        return c;
    }

    setColor(c){
        push();
        colorMode(HSB);
        this.colores = [];
         let d = 30;
         let d2 = 20;
         let d3 = 10;
        let alpha = 0.2;
        let brillo = brightness(c);
        let oscuro = brillo<=35;
       this.colores.push(color(hue(c),saturation(c),brillo,alpha));//random(255),random(0),random(0)));

        let h = hue(this.colores[0])
        let s = saturation(this.colores[0])
        let b = brightness(this.colores[0])
        let brilloCom = oscuro?100:constrain(random(-d3,d3)+b,0,100);
        let satCom = oscuro?100:constrain(random(-d2,d2)+s,0,100);
        this.colores.push(color((180+h)%360,
        satCom,
        brilloCom,alpha));
        for(let i=0;i<4;i++){
            this.colores.push(color((random(-d,d)+h)%360,
            constrain(random(-d2,d2)+s,0,100),
            constrain(random(-d3,d3)+b,0,100),alpha));
        }
        pop();
    }
}
