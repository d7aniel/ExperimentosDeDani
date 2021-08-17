var espirografos = [];
var paleta;
var fondo;
var colorP;;
function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    paleta = new Paleta();
    for(let i=0;i<3;i++){
        let cp = createColorPicker(paleta.get());
        cp.position(10, 80+i*35);
        espirografos.push(new Espirografo(cp));
    }
    fondo = paleta.getFondo();

    button = createButton('Modificar Forma');
    button.position(10, height-50);
    button.style('width', '15%');
    button.mousePressed(modificar);

    button = createButton('Reiniciar grafico');
    button.position(10, height-80);
    button.style('width', '15%');
    button.mousePressed(reiniciar);

    button = createButton('Cambiar Colores');
    button.position(10, height-110);
    button.style('width', '15%');
    button.mousePressed(cambiarColor);

    colorP = createColorPicker(fondo);
    colorP.position(10, 30);
    colorP.input(elegirColor);


}

function draw() {
    background(fondo);
    for(let e of espirografos){
        e.calcularEnGrafico();
        image(e.grafico,0,0);
    }

}


function modificar(){
    for(let e of espirografos){
        e.setValores();
        e.grafico.clear();
    }
}

function reiniciar(){
    for(let e of espirografos){
        e.grafico.clear();
        e.angulos = e.angulos.map(()=>0);
    }
}

function elegirColor(){
    fondo = colorP.color();
}

function getColorHex(color){
    let r = int(red(color)).toString(16);
    let g = int(green(color)).toString(16);
    let b = int(blue(color)).toString(16);
    let t = "#";
    t+=r;
    if(g.length==1)
    t+=0;
    t+=g;
    if(b.length==1)
    t+=0;
    t+=b;
    return t;
}

function cambiarColor(){
    paleta.set();
    colorP.elt.value = getColorHex(paleta.getFondo());//"#ff0000";//getColorHex(paleta.getFondo());
    fondo = colorP.color();
    for(let e of espirografos){
        e.resetColor(getColorHex(paleta.get()));
    }
}

//
// function crearSlider(vmin,vmax,valor,paso,sliders,i,j){
//     let s = createSlider(vmin ,vmax ,valor ,paso);
//     s.min = parseFloat(s.elt.getAttribute('min'));
//     s.max = parseFloat(s.elt.getAttribute('max'));
//     s.position(45, 10+j*25+i*90);
//     s.style('width', '17%');
//     s.style('background-color', colores[i]);
//     s.style('background', 'linear-gradient(to right, '+colores[i]+' 0%, '+colores[i]+' 20%, #fff 80%, #fff 100%)');
//     s.style('height', '5px');
//     s.style('transition', 'background 450ms ease-in');
//     s.style('-webkit-appearance', 'none');
//     sliders.push(s);
//
//     let t1 = createSpan(nf(vmin,1,2));
//     t1.position(10, 10+j*25+i*90);
//     t1.style('color','#fff');
//     let t2 = createSpan(nf(vmax,1,1));
//     t2.position(55+width*0.17, 10+j*25+i*90);
//     t2.style('color','#fff');
//
//     let nom = j==0?'tamanio':j==1?'velocidad':'fase';
//     let n = createSpan(nom);
//     n.position(100+width*0.2, 10+j*25+i*90);
//     n.style('color','#fff');
//
// }




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
