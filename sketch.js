var theif, coins, new_coins, background,coinsGroup;
var theifImage, coinsImage, backgroundImage, endImg;
var score=0;
var coinsGroup;
var bottomEdge, topEdge;
var coinsSound;
var rocks, rocksImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var canvas;


function preload()
{
  //images Loaded
  
  theifImage=loadImage("theif.png");
  coinsImage=loadImage("coins.png");
  backgroundImage=loadImage("bg.png");
  rocksImage=loadImage("rocks.png");
  endImg=loadImage("end img.jpg");
}

function setup()
{
  canvas = createCanvas(displayWidth-30,displayHeight-30);
  
    //background
    background = createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
    background.addImage(backgroundImage);
    background.scale = 4.3
  
    //theif sprite
    theif=createSprite(600,650,20,20)
    theif.addImage(theifImage);
    theif.scale=0.25;
  
   coinsGroup=new Group();
   rocksGroup= new Group();
  
   bottomEdge= createSprite(0,330,300,10);
   topEdge= createSprite(0,35,300,10);
}

function draw()
{
  if(gameState===PLAY){
  if(background.x<0){
    background.x=background.width/2
  } 
  
  if(keyDown("left")){
    theif.velocityX=-4
  }
  
  if(keyDown("right")){
    theif.velocityX=4
  }
  
  camera.position.x=theif.x
  camera.position.y=displayHeight/2

  spawnCoins();
  spawnRocks();
  
  theif.setCollider("circle",0,0,30)
  
  if(theif.isTouching(coinsGroup))
    {
      coinsGroup.destroyEach();
      score=score+1
    }
  
    
    bottomEdge.visible=false;
    topEdge.visible=false;
  
  
    
      if(theif.isTouching(rocksGroup)){
     rocksGroup.destroyEach();
        theif.velocityY=0;
        theif.velocityX=0;
        gameState = END;
      }
  
      
  }
    
  drawSprites();
    
  //ending the game
    if(gameState === END)
     {   
     score=0;
     //textSize(50);
     //fill("white");
     //text("Gameover!", theif.x-150, theif.y-500)
     //text("Press enter to restart", theif.x-200, theif.y-400)
     image(endImg, 30, 30, theif.x+300, theif.y-300)
    }

    if(keyDown("enter"))
      {
        restart();
      }

    //score
  textSize(30);
  fill("White")
  text("Score:"+score,theif.x-600,theif.y-600);
}

function spawnCoins() {
  //producing coins
  if (frameCount % 180 === 0) {
    coins = createSprite(100,0,40,10);
    coins.addImage(coinsImage)
    coins.x = Math.round(random(theif.x-300,theif.x+300))
    coins.scale = 0.1
    coins.velocityY =+(8+(score/15));
    
    
    //assigning lifetime to the variable
    coins.lifetime = 200
    
    //adjust the depth
    coins.depth = theif.depth
    theif.depth = theif.depth + 1;
    coinsGroup.add(coins)
    }
}


//making the rocks
function spawnRocks(){
  if(frameCount%90===0){
    rocks=createSprite(100,0,20,20)
    rocks.addImage(rocksImage)
    rocks.x=Math.round(random(theif.x-300,theif.x+300))
    rocks.velocityY=+(8+(score/15))
    rocks.scale=0.5
    
    rocks.lifetime = 200
    
    rocks.depth = theif.depth
    theif.depth = theif.depth + 1;
    rocksGroup.add(rocks)
  }
}

//restarting the game
function restart(){
  score=0;
  coinsGroup.destroyEach();
  rocksGroup.destroyEach();
  gameState=PLAY;
  theif.velocityX=0;
  theif.position.x= 600
  theif.position.y=650
}