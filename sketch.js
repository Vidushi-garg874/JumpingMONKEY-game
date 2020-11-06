var PLAY = 1;
var END = 0;
var gameState;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var survivalTime = 0;
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  
  gameState = PLAY;
  
 
  monkey = createSprite(80,315,20,20);
   monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
   bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("lightblue");
  
 if (gameState === PLAY){
    
    score = score + Math.round(getFrameRate()/60);
    
     spawnbanana();
     spawnObstacle();
    
   
    
 }
  
  if(gameState === END){
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
  }
  
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :" + score,100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time :" + survivalTime,300,50);
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
 
  
 ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
 
  monkey.collide(ground);
  
  drawSprites();
}



function spawnbanana() {
  
  if (frameCount % 80 === 0) {
    
    banana = createSprite(600,150,40,10);
   
    
    banana.y = Math.round(random(120,200));
    
    banana.addImage(bananaImage);
    
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     
    banana.lifetime = 200;
    
  
    //cloud.depth = trex.depth;
      //trex.depth = trex.depth + 1;
    
    bananaGroup.add(banana);
  
    
  }
  
}

function spawnObstacle() {
  
  if (frameCount % 300 === 0) {
    
    obstacle = createSprite(600,315,40,10);
    
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     
    obstacle.lifetime = 200;
    
  
    //cloud.depth = trex.depth;
      //trex.depth = trex.depth + 1;
    
    obstacleGroup.add(obstacle);
    
    
  }
  
}

