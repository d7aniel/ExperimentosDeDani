var cant = 3;
var amplitudes = [];
var velocidades = [];
var angulos = [];
var faces = [];
var colores = ['#ff0000','#0000ff','#00ff00'];
var coloresPrograma = ['#ff0000','#0000ff','#00ff00'];

var lista = [];

var ui = [];
var play = true;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    for (var i=0; i<cant; i++) {
        amplitudes.push(random(100));
        velocidades.push(random(-0.1, 0.1));
        angulos.push(0);
        faces.push(random(TWO_PI));
        let sliders = [];
        for (var j=0; j<3; j++) {
            let vmin =  j==0?0:            j==1?-0.5          :0;
            let vmax =  j==0?100:          j==1?0.5           :TWO_PI;
            let valor = j==0?amplitudes[i]:j==1?velocidades[i]:faces[i];
            let paso =  j==0?1:            j==1?0.001         :0.01;
            console.log(valor);
            crearSlider(vmin,vmax,valor,paso,sliders,i,j);

        }
        ui.push(sliders);
    }

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
    for (let i=0; i<cant; i++) {
        amplitudes[i] = ui[i][0].value();
        velocidades[i] = ui[i][1].value();
        faces[i] = ui[i][2].value();
        let prevx = x;
        let prevy = y;
        x+=amplitudes[i]*cos(angulos[i]+faces[i]);
        y+=amplitudes[i]*sin(angulos[i]+faces[i]);
        stroke(colores[i]);
        line(x, y, prevx, prevy);
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

    for (var i=0; i<cant; i++) {
        for (var j=0; j<3; j++) {
            v = (ui[i][j].value()-ui[i][j].min)/(ui[i][j].max-ui[i][j].min)*100;
            ui[i][j].elt.style.background = 'linear-gradient(to right, '+colores[i]+' 0%, '+colores[i]+' ' + v + '%, #fff ' + v + '%, white 100%)'
        }
    }
}

function reiniciar(){
    lista = [];
    angulos.map(()=>0);
}

function pp(){
    play = !play;
}

function crearSlider(vmin,vmax,valor,paso,sliders,i,j){
    let s = createSlider(vmin ,vmax ,valor ,paso);
    s.min = parseFloat(s.elt.getAttribute('min'));
    s.max = parseFloat(s.elt.getAttribute('max'));
    s.position(45, 10+j*25+i*90);
    s.style('width', '17%');
    s.style('background-color', colores[i]);
    s.style('background', 'linear-gradient(to right, '+colores[i]+' 0%, '+colores[i]+' 20%, #fff 80%, #fff 100%)');
    s.style('height', '5px');
    s.style('transition', 'background 450ms ease-in');
    s.style('-webkit-appearance', 'none');
    sliders.push(s);

    let t1 = createSpan(nf(vmin,1,2));
    t1.position(10, 10+j*25+i*90);
    t1.style('color','#fff');
    let t2 = createSpan(nf(vmax,1,1));
    t2.position(55+width*0.17, 10+j*25+i*90);
    t2.style('color','#fff');

    let nom = j==0?'tamanio':j==1?'velocidad':'fase';
    let n = createSpan(nom);
    n.position(100+width*0.2, 10+j*25+i*90);
    n.style('color','#fff');

}




/*
var carita;
function setup() {
createCanvas(window.innerWidth,window.innerHeight);
carita = new Carita(150,0,300);
}

function draw() {
background(100,0,100);
translate(width/2,height/2);
noStroke();
carita.mover(mouseX-width/2,mouseY-height/2);
let camTam = Math.sin(frameCount*0.1)+1.1;
carita.cambiarTam(camTam*150);
carita.dibujar();
}

class Carita{
constructor(x,y,t){
this.x = x;
this.y = y;
this.t = t;
}
mover(x,y){
this.x = x;
this.y = y;
}
cambiarTam(t){
this.t = t;
}
dibujar(){
let factor = this.t/250;
fill(200,200,0);
ellipse(this.x,this.y,this.t,this.t);
fill(0);
ellipse(this.x-50*factor,this.y-40*factor,20*factor,40*factor);
ellipse(this.x+50*factor,this.y-40*factor,20*factor,40*factor);
ellipse(this.x,this.y,20*factor,20*factor);
noFill();
stroke(0);
strokeWeight(10*factor);
arc(this.x,this.y,150*factor,150*factor,0,PI);
}
}*/
