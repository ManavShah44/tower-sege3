const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1,box2,box3,box4, polygon,platform;
var backgroundImg,platform;
var bird, slingShot,score=0, gameState="onSling";

function preload() {
   getBackgroundImage()
    
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;
    polygon= new Poligone(150,200,50,50)

    slingshot= new SlingShot(polygon.body,{x:150,y:200})
    box1=new Box(870,150,50,50)
    box2=new Box(820,150,50,50)
    box3=new Box(770,150,50,50)
    box4=new Box(820,100,50,50)
    ground = new Ground(600,height,1200,20)
    
    platform= new Ground(800,200,200,20)
  }
  function draw(){
    if(backgroundImg)
    {
        background(backgroundImg);
    }
    textSize(25)
    text("SCORE: "+score,550,50)
    Engine.update(engine);
    slingshot.display()
    ground.display()
    box1.display()
    box2.display()
    box3.display()
    box4.display()
    
    platform.display()
    polygon.display()
    
    
  }
  function mouseDragged(){
    if(gameState=="onSling"){
        Matter.Body.setPosition(polygon.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    gameState="launched"
    slingshot.fly();
}
function keyPressed(){
    if(keyCode==32){
        Matter.Body.setPosition(polygon.body,{x:200,y:50})
        slingshot.attach(polygon.body)
        gameState="onSling"
        

    }
}
async function getBackgroundImage(){
    var response= await fetch("https://worldtimeapi.org/api/timezone/Asia/kolkata")
    var responseJSON= await response.json()
    var dateTime=responseJSON.datetime
    var hours=dateTime.slice(11,13)
    if(hours>6&&hours<18){
        bg = "download.png"
    }
    else{
        bg="download(1).png"
    }
    backgroundImg=loadImage(bg)
}