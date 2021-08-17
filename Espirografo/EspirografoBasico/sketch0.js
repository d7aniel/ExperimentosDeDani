var cant = 3;
var amplitudes = [];
var velocidades = [];
var angulos = [];
var faces = [];
var colores = ['#ff0000','#0000ff','#00ff00'];

var lista = [];

var play = true;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    setValores();
    button = createButton('Play/Pause');
    button.position(10, height-50);
    button.style('width', '15%');
    button.mousePressed(pp);

    button = createButton('Reiniciar');
    button.position(10, height-80);
    button.style('width', '15%');
    button.mousePressed(reiniciar);
}

function draw() {
    background(0);
    stroke(255);
    let x = width/2;
    let y = height/2;
    strokeWeight(3);
    var anguloAcumulado = 0
    for (let i=0; i<cant; i++) {
        let prevx = x;
        let prevy = y;
        x+=amplitudes[i]*0.5*cos(angulos[i]+faces[i]);
        y+=amplitudes[i]*0.5*sin(angulos[i]+faces[i]);
        stroke(colores[i]);
        line(x, y, prevx, prevy);
        noFill();
        if(i==0){
            var diametroEngraneInterno = -amplitudes[i]+height*0.9;
            ellipse(x, y,diametroEngraneInterno,diametroEngraneInterno);
            ellipse(x+diametroEngraneInterno*0.5*cos(angulos[i+1]), y+diametroEngraneInterno*0.5*sin(angulos[i+1]),10,10);
            stroke(255);
            ellipse(prevx, prevy,height*0.9,height*0.9);
        }
        if(play){
            angulos[i]+=velocidades[i];
        }
    }
    lista.unshift({x:x, y:y});

stroke(255);
strokeWeight(0.5);
    for (let i=0; i<lista.length-1; i++) {
        var p1 = lista[i];
        var p2 = lista[i+1];
        line(p1.x, p1.y, p2.x, p2.y);
    }

    if (lista.length>1000) {
        lista.pop();
    }

    let t = "";
    let xt = 20;
    t+= "Radio externo (Ciruclo Blanco): "+int(height*0.9)+"\n";
    noStroke();
    fill(255);
    text (t,xt,50);
    let saltoLinea = 30;
    t = "d1 (Linea Roja): "+int(amplitudes[0])+"\n";
    fill(255,0,0);
    text (t,xt,50+saltoLinea);
    t = "d2 (Linea Azul): "+int(amplitudes[1])+"\n";
    fill(0,0,255);
    text (t,xt,50+saltoLinea*2);
    t = "El radio interno se calcula como \n"
    t += "(Radio externo - d1) es decir \n"
    t += ""+int(height*0.9)+" - "+int(amplitudes[0])+"\n";
    fill(255);
    text (t,xt,50+saltoLinea*3);
    t = "Radio interno (Circulo Rojo): "+(int(height*0.9) - int(amplitudes[0]))+"\n";
    fill(255,0,0);
    text (t,xt,50+saltoLinea*3+15*3);
}

function setValores(){
    amplitudes = [];
    velocidades = [];
    angulos = [];
    faces = [];
    diametro = height*0.9-height*0.9*random(0.01,0.95)
    ratio = (height*0.9)/diametro
    amplitudes.push(-diametro+height*0.9);
    amplitudes.push(random(diametro));
    amplitudes.push(0);
    velocidades.push(0.03);
    velocidades.push(0.03*-ratio);
    velocidades.push(0.0);
    angulos.push(0);
    angulos.push(0);
    angulos.push(0);
    faces.push(0);
    faces.push(random(TWO_PI));
    faces.push(0);

}

function reiniciar(){
    setValores();
    lista = [];
    angulos = angulos.map(()=>0);
}

function pp(){
    play = !play;
}
