var towerImg, tower;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  
  ghost = createSprite(300,300);
  ghost.addImage("Ghost-standing",ghostImg);
  ghost.scale = 0.5;
  ghost.setCollider("rectangle",-15,25,150,250);
  ghost.debug = false;

  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  



  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if(keyDown("right")){
      ghost.x = ghost.x + 4;
    }

    if(keyDown("left")){
      ghost.x = ghost.x - 4;
    }

    if(ghost.x >= 630){
      ghost.x = -29;
    }
    if(ghost.x <= -30){
      ghost.x = 629;
    }

    if(ghost.isTouching(invisibleBlockGroup ) || ghost.y >= 600 ){
      gameState = "end";
    }  





    if(gameState === "end"){
      ghost.destroy();
      climbersGroup.destroyEach();
      invisibleBlockGroup.destroyEach();
      tower.velocityY = 0;
      textSize(50);
      fill("yellow");
      textAlign(CENTER);
      text("Game Over",300,300);
      
    }

    ghost.collide(climbersGroup);

    if(ghost.isTouching(climbersGroup)){
      score = score + 1;
    }
  


    spawnClimbers();
    invisibleBlocks()

    drawSprites();

}


function spawnClimbers(){
  if(frameCount % 100 === 0){
     climber = createSprite(Math.round(random(125,400)),-10);
     climber.addImage("Climbers",climberImg);
     climber.velocityY = 3;
     climbersGroup.add(climber);
     climber.setCollider("rectangle",0,-10,100,6);
     climber.debug = false;
  }
}

function invisibleBlocks(){
  if(frameCount % 100 === 0){
      invisibleBlock = createSprite(climber.x - 2,0,100,5);
      invisibleBlock.velocityY = 3;
      invisibleBlockGroup.add(invisibleBlock);
      invisibleBlock.setCollider("rectangle",0,6,90,6);
      invisibleBlock.debug = false;
      invisibleBlock.visible = false;

   }
}



