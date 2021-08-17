class Espirografo{
    constructor(color){
        this.cant = 3;
        this.amplitudes = [];
        this.velocidades = [];
        this.angulos = [];
        this.faces = [];
        this.colores = ['#ff0000','#0000ff','#00ff00'];
        this.color = color;//color(random(255),random(255),random(255),100);
        this.setValores();
        this.grafico = createGraphics(width,height);
        this.grafico.stroke(this.color.color());
        this.grafico.strokeCap(SQUARE);
        this.grafico.strokeWeight(2);
        this.lista = [];
    }

    dibujar(){

    }

    dibujar(){
        background(0);
        image(this.grafico,0,0);
        stroke(255);
        let x = width/2;
        let y = height/2;
        strokeWeight(3);
        var anguloAcumulado = 0
        for (let i=0; i<this.cant; i++) {
            let prevx = x;
            let prevy = y;
            x+=this.amplitudes[i]*0.5*cos(this.angulos[i]+this.faces[i]);
            y+=this.amplitudes[i]*0.5*sin(this.angulos[i]+this.faces[i]);
            stroke(this.colores[i]);
            line(x, y, prevx, prevy);
            noFill();
            if(i<2){
                var diametroEngraneInterno = i==0?-this.amplitudes[i]+height*0.9:-this.amplitudes[i]-this.amplitudes[0]+height*0.9;
                ellipse(x, y,diametroEngraneInterno,diametroEngraneInterno);
                ellipse(x+diametroEngraneInterno*0.5*cos(this.angulos[i+1]), y+diametroEngraneInterno*0.5*sin(this.angulos[i+1]),10,10);
                if(i==0){
                    stroke(255);
                    ellipse(prevx, prevy,height*0.9,height*0.9);
                }
            }
            this.angulos[i]+=this.velocidades[i];
        }
        //strokeWeight(50);
        /*noStroke();
        fill(255);
        this.grafico.ellipse(x,y,5,5);*/
        this.lista.unshift({x:x, y:y});

        stroke(255);
        strokeWeight(0.5);
            for (let i=0; i<this.lista.length-1; i++) {
                var p1 = this.lista[i];
                var p2 = this.lista[i+1];
                line(p1.x, p1.y, p2.x, p2.y);
            }

            if (this.lista.length>1000) {
                this.lista.pop();
            }
    }

    calcularEnGrafico(){
        let x = width/2;
        let y = height/2;
        let px = width/2;
        let py = height/2;
        for (let i=0; i<this.cant; i++) {
            x+=this.amplitudes[i]*0.5*cos(this.angulos[i]+this.faces[i]);
            y+=this.amplitudes[i]*0.5*sin(this.angulos[i]+this.faces[i]);
            px+=this.amplitudes[i]*0.5*cos(this.angulos[i]-this.velocidades[i]+this.faces[i]);
            py+=this.amplitudes[i]*0.5*sin(this.angulos[i]-this.velocidades[i]+this.faces[i]);
            this.angulos[i]+=this.velocidades[i];
        }
        //this.grafico.stroke(255);
        this.grafico.stroke(this.color.color());
        this.grafico.line(x,y,px,py);
        //let punto = {x:x, y:y, px:px, py:py};
        //return punto;
    }

    setValores(){
        this.amplitudes = [];
        this.velocidades = [];
        this.angulos = [];
        this.faces = [];
        this.lista = [];
        let vIni = 0.04;
        console.log(parseInt(random(1,5))*2)
        let diametro = height*0.9-height*0.9*random(0.1,0.9);//(1/(parseInt(random(1,5))*2))
        let ratio = (height*0.9)/diametro
        this.amplitudes.push(-diametro+height*0.9);
        let diametro2 = diametro-diametro*random(0.1,0.9);//*(1/(parseInt(random(1,5))*2));//(1/parseInt(random(1,11)))
        let ratio2 = diametro/diametro2
        this.amplitudes.push(-diametro2+diametro);
        this.amplitudes.push(diametro2*random(0.1,0.9));//*(1/(parseInt(random(1,5))*2)););
        this.velocidades.push(vIni);
        this.velocidades.push(vIni*-ratio);
        this.velocidades.push(vIni*-ratio*-ratio2);
        this.angulos.push(0);
        this.angulos.push(0);
        this.angulos.push(0);
        this.faces.push(0);//random(TWO_PI));
        this.faces.push(0);//random(TWO_PI));
        this.faces.push(0);//random(TWO_PI));
    }



    resetColor(color){
        this.color.elt.value = color;
    }

}
