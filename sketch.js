const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1, pig2;
var backgroundImg,bg,platform;
var bird1,bird2,bird3, slingshot;
var gameState = "OnSling";
var score = 0;
var birds = [];

function preload() {
    backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig2 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird1 = new Bird(200,50);
    bird2 = new Bird(150,50);
    bird3 = new Bird(100,50);
    
    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird1);
    
    slingshot = new SlingShot(bird1.body,{x:200, y:50});
}

function draw(){
    background(backgroundImg);
    Engine.update(engine);
    
    textSize(20);
    fill(255,0,0);
    text("Score = "+score,25,50);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.Score();
    log1.display();

    box3.display();
    box4.display();
    pig2.display();
    pig2.Score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird1.display();
    bird2.display();
    bird3.display();
    platform.display();
    
    slingshot.display(); 
    console.log(bird1.body.speed); 
}

function mouseDragged(){
    if(gameState !== "Launched")
    Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
    gameState = "Launched";
    birds.pop();
}

function keyPressed(){
    if(keyCode === 32 && gameState === "Launched" ){
        gameState = "OnSling"; 
        Matter.Body.setPosition(birds[birds.length-1].body, {x: 200, y: 50});
        slingshot.attach(birds[birds.length-1].body);
    }
}

async function getBackgroundImage()
{
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var dateTime = responseJSON.datetime;
    var hour = dateTime.slice(11,13);

    console.log(hour);
    if(hour <= 19 && hour >= 07)
    {
        bg = "sprites/bg.png" ;
    }
    else
    {
        bg = "sprites/bg2.jpg" ;
    }
    backgroundImg = loadImage(bg);
}