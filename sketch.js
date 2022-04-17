//creacion de sprites
var kaizer,gorro;
var vidas = 5;
var gameState = "ESPERANDO";
var salto = "piso";

var navesGroup, pinchosGroup;
var  pisosGroup, techosGroup, paredes, paredesGroup;
var plataformasGroup;

var enfriamiento = 100;

function preload(){
  
}

function setup() {
createCanvas(2000,600);
//creacion de grupos


pisosGroup = new Group();
paredesGroup = new Group();
navesGroup = new Group();
pinchosGroup = new Group();
plataformasGroup = new Group();
techosGroup = new Group();

var a = cuarto_principal(100,100);
var b = cuarto1(100,-70);
var c = cuarto2(100,200);
var d = cuarto3(-100,200);
var e = cuarto4(-114,400);
var f = cuarto5(900,400);
var g = cuarto6(900,600);
var h = cuarto7(900,800);
var i = cuarto8(1412,800);
var j = cuarto9(1412,800);
var k = cuarto10(1412,800);
var l = cuarto11(1412,800);
var m = cuarto12(1412,800);
var n = cuarto13(405,600);
var o = cuarto14(910,600);
var p = cuarto15(1412,600);
var q = cuarto16(1412,800);
var r = cuarto17(1412,800);
var s = cuarto18(1412,800);
var t = cuarto19(1412,800);
var u = cuarto20(1412,800);

var nave1 = naves(100,225,2,2);
var nave2 = naves(25,175,10,2);


//var pincho1 = pinchos(random(-36,36),345);
// var pincho2 = pinchos(12,345,0,0);
// var pincho3 = pinchos(-12,345,0,0);
// var pincho4 = pinchos(-24,345,0,0);
// var pincho5 = pinchos(24,345,0,0);
// var pincho6 = pinchos(36,345,0,0);
// var pincho7 = pinchos(-36,345,0,0);

// var pincho7 = pinchos(205,345,3,0);
// var pincho7 = pinchos(155,305,0,3);


//creacion del personaje principal
kaizer = createSprite(1,200,15,15);
kaizer.setCollider("rectangle",0,0,15,15);
kaizer.debug = true;
gorro = createSprite(kaizer.x,kaizer.y-7,15,5);
gorro.setCollider("rectangle",0,0,15,15);
gorro.debug = true;
}

function draw() {

  gorro.x = kaizer.x;
  gorro.y = kaizer.y-7;

background("black");
if(gameState === "ESPERANDO"){
  if(keyDown("D")){
    gameState = "PLAY";
  }
  if(keyDown("A")){
    gameState = "PLAY";
  }
  camera.position.x = kaizer.x+620;
  camera.position.y = kaizer.y;
  camera.zoom = 1.4;

  navesGroup.bounceOff(paredesGroup);
  navesGroup.bounceOff(pisosGroup);
  navesGroup.bounceOff(plataformasGroup);
  navesGroup.bounceOff(techosGroup);


}

if(gameState === "PLAY"){
  textSize(20);
  fill("white");
  text("vidas: "+ vidas, camera.position.x+410, camera.position.y-165);

  if(enfriamiento < 1){
    textSize(20);
    fill("white");
    text("teletransporte listo", camera.position.x+510, camera.position.y-165);
  }else{
    textSize(20);
    fill("white");
    text("enfriamiento: "+ enfriamiento, camera.position.x+510, camera.position.y-165);
  }


  // console.log(mouseX, mouseY);

  kaizer.velocityX = 0;
  //camara
  // camera.position.x = kaizer.x+620;
  // camera.position.y = kaizer.y;
  // camera.zoom = 1.4;

  if(keyDown("I")){
    camera.position.y = camera.position.y-7;
  }
  if(keyDown("K")){
    camera.position.y = camera.position.y+7;
  }
  if(keyDown("J")){
    camera.position.x = camera.position.x-7;
  }
  if(keyDown("L")){
    camera.position.x = camera.position.x+7;
  }

  //naves 
  navesGroup.bounceOff(paredesGroup);
  navesGroup.bounceOff(pisosGroup);
  navesGroup.bounceOff(plataformasGroup);
  navesGroup.bounceOff(techosGroup);
  pinchosGroup.bounceOff(pisosGroup);
  pinchosGroup.bounceOff(paredesGroup);

  //gravedad

  if(kaizer.isTouching(pisosGroup)||kaizer.isTouching(plataformasGroup)){
    kaizer.velocityY = 0;
    salto = "piso";
  }
  if(gorro.isTouching(pisosGroup)||gorro.isTouching(plataformasGroup)){
    kaizer.velocityY = 3;
  }
  if(salto === "piso"){
    if(keyDown("A")){
      kaizer.x=  kaizer.x-2;
      kaizer.velocityY =  kaizer.velocityY+1;
      enfriamiento = enfriamiento-1;
      
    }
    if(keyDown("D")){
      kaizer.x =  kaizer.x+2;
      kaizer.velocityY =  kaizer.velocityY+1;
      enfriamiento = enfriamiento-1;
    }
  }
  if(salto !== "piso"){
  if(keyDown("A")){
    kaizer.x=  kaizer.x-3;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = enfriamiento-1;
  }
  if(keyDown("D")){
    kaizer.x =  kaizer.x+3;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = enfriamiento-1;
  }
  }

  if(keyWentDown("N")&& enfriamiento < 1){
    kaizer.x = kaizer.x-80;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = 100;
  }
  if(keyWentDown("M")&enfriamiento < 1){
    kaizer.x = kaizer.x+80;
    kaizer.velocityY =  kaizer.velocityY+1;
    enfriamiento = 100;
  }
  // if(keyDown("W")){
  //   kaizer.y=  kaizer.y-2;
  // }
  // if(keyDown("S")){
  //   kaizer.y =  kaizer.y+2;
  // }
  if(salto === "piso"){
    if(keyWentDown("SPACE")){
      // kaizer.y = kaizer.y-100;
      kaizer.velocityY = kaizer.velocityY-40;
      salto = "aire";
      if(kaizer.isTouching(pisosGroup)||kaizer.isTouching(plataformasGroup)){
        kaizer.velocityY = 0;
        salto = "piso";
      }
    }
  }
  if(salto === "aire"){
    kaizer.velocityY = kaizer.velocityY+5;
  }
  if(kaizer.velocityY <= -25){
    kaizer.velocityY = kaizer.velocityY+5;
  }

  if(kaizer.velocityY >= 8){
    kaizer.velocityY = 5;
  }
  kaizer.collide(paredesGroup);
  kaizer.collide(pisosGroup);
  kaizer.collide(plataformasGroup);
  kaizer.collide(techosGroup);
  //reglas
  if(kaizer.y > 1000){
    kaizer.y = 100;
    vidas = vidas-1;
  }
  if(vidas <= 0){
    gameState = "END";
  }
}
if(gameState === "END"){
  kaizer.velocityY = 0;

  textSize(50);
  fill("white");
  text("GAME OVER", camera.position.x-500, camera.position.y);

}

// camera.off();

  drawSprites();
}

///////////////////////////////////
/***********FUNCIONES************/
/////////////////////////////////
function pisos(x,y){
      var p = createSprite(x,y,500,10);
      pisosGroup.add(p);
}
//puertas horizontales
function puertas1(x,y){
  var t1 = createSprite(x-73,y,370,10);
  var t2 = createSprite(x+213,y,90,10);
  pisosGroup.add(t1);
  pisosGroup.add(t2);
}
function puertas3(x,y){
  var t3 = createSprite(x+200,y,370,10);
  var t4 = createSprite(x-85,y,90,10);
  pisosGroup.add(t3);
  pisosGroup.add(t4);
}
//puertas verticales
function puertas2(x,y){
  var w1 = createSprite(x,y-90,15,20);
  var w2 = createSprite(x,y+35,15,130);
  paredesGroup.add(w1);
  paredesGroup.add(w2);
}
function puertas4(x,y){
  var w3 = createSprite(x,y+100,15,20);
  var w4 = createSprite(x,y-30,15,120);
  paredesGroup.add(w3);
  paredesGroup.add(w4);
}


function paredes(x,y){
    var w = createSprite(x,y,15,200);
    paredesGroup.add(w);
}
function techos(x,y){
  var t = createSprite(x,y,500,10);
  techosGroup.add(t);
}
function plataformas(x,y){
  var p = createSprite(x,y,50,10);
  plataformasGroup.add(p);
}
function cuarto_principal(i,j){
  paredes(i-150,j+55);
  pisos(i+100,j+150);
  paredes(i+350,j+55);
  puertas1(i+100,j-50);
  plataformas(i+250,j+30,100,100);
  plataformas(i+180,j+85,100,100);

}
function cuarto1(i,j){
  paredes(i-150,j+25);
  techos(i+100,j-70);
  puertas2(i+350,j+25);
  plataformas(i+330,j);
  plataformas(i+200,j+20);
  plataformas(i+150,j+65);
}
function cuarto2(i,j){
  paredes(i+847,j-250);
  pisos(i+605,j-150);
  techos(i+605,j-345);
}
function cuarto3(i,j){
  paredes(i-450,j-245);
  pisos(i-205,j-150);
  techos(i-205,j-340);
}
function cuarto4(i,j){
  paredes(i-460,j-245);
  paredes(i+50,j-245);
  pisos(i-205,j-150);
  techos(i-205,j-340);

}
function cuarto5(i,j){
  paredes(i-460,j-245);
  paredes(i+50,j-245);
  puertas1(i-205,j-150);
  techos(i-205,j-340);

}
function cuarto6(i,j){
  paredes(i-460,j-245);
  paredes(i+50,j-245);
  puertas3(i-330,j-150);

}
function cuarto7(i,j){
  paredes(i-460,j-245);
  puertas4(i+50,j-255);
  pisos(i-205,j-150);

}
function cuarto8(i,j){
  puertas2(i+45,j-245);
  puertas3(i-335,j-150);
  puertas1(i-205,j-348);

}
function cuarto9(i,j){
  paredes(i+550,j-245);
  pisos(i+805,j-150);
  techos(i+300,j-344);

}
function cuarto10(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto11(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto12(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto13(i,j){
  paredes(i+1050,j-245);
  techos(i+800,j-344);

}
function cuarto14(i,j){
  paredes(i+1050,j-245);
  techos(i+800,j-344);

}
function cuarto15(i,j){
  paredes(i+1050,j-245);
  techos(i+800,j-344);

}
function cuarto16(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto17(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto18(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto19(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}
function cuarto20(i,j){
  paredes(i+1050,j-245);
  pisos(i+300,j-150);
  techos(i+800,j-344);

}


function naves(x,y,vx,vy){
var b = createSprite(x,y,10,10);
b.shapeColor="blue";
b.setVelocity(vx,vy);
navesGroup.add(b);
}

function pinchos(x,y){
var n = createSprite(x,y,10,10);
n.shapeColor="red";
n.rotation=45;

pinchosGroup.add(n);
}