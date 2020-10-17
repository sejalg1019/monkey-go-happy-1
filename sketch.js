var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;

function preload(){
  
  monkey_running =                 loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(50,350,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,400,1500,50);
  
  obstacleGroup = new Group();
  foodGroup = new Group();
  
}


function draw() {
  
  background("white");
  
  var survivalTime = 0;
  
  if(gameState===PLAY){
    
    survivalTime = Math.ceil(frameCount/frameRate());
    ground.velocityX = -3;
    
    if(keyDown("space")&&monkey.y>300){
    
      monkey.velocityY = -15;
    
  }
      
    monkey.velocityY += 0.8;

    if(ground.x<0){
      
      ground.x = ground.width/2;
      
  }
  
    spawnObstacles();
    spawnFood();
    
    if(obstacleGroup.isTouching(monkey)){
        
      gameState=END;
    
  }
    
  } else if(gameState===END){
    
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
    
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time:"+ survivalTime, 100,50);
  
  monkey.collide(ground);
  drawSprites();
  
}

function spawnObstacles(){
  
  if(frameCount%300===0){
    var obstacle = createSprite(600,340,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 400;
    
  }
  
}

function spawnFood(){
  
  if(frameCount%80===0){
    
    var banana = createSprite(600,Math.round(random(120,200)),50,50);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    foodGroup.add(banana);
    banana.lifetime = 400;
    banana.depth = monkey.depth;
    monkey.depth += 1;
    
  }
  
}






