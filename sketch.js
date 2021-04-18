var tower,towerImg;
var door,doorImg,doorGroup;
var climber,climberImg,climberGroup;
var ghost,ghostImg;
var invisibleBlock,invisibleBlockGroup;
var gameState = "PLAY";
var edges;






function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.4; 
  
  edges = createEdgeSprites();
  
}

function draw(){
  
  background("black");
  
  
  if(gameState === "PLAY"){
    
    ghost.bounceOff(edges[1]);
    ghost.bounceOff(edges[0]);
    
    if(tower.y > 400){
    tower.y = 300;
  }
     if(keyDown("space")){ 
ghost.velocityY = -10; 
      
} 
  ghost.velocityY = ghost.velocityY + 0.8;  
    
if(keyDown("left_arrow")){       
ghost.x = ghost.x - 3;     
}  
    
    if(keyDown("right_arrow")){       
ghost.x = ghost.x + 3;     
}
  
       
    if(climberGroup.isTouching(ghost)){
       ghost.velocityY = 0;                                                }
         
  if(invisibleBlockGroup.isTouching(ghost)||(ghost.y>600)){
     ghost.destroy();
    gameState = "END";
    
     
     }
    
    
     
  spawndoor();
  
   drawSprites();
  }
  
  if(gameState === "END"){
    fill("orange");
    textSize(30);
    text("gameOver",300,300);
    
    
    
  }
    
   
 
  
 
}


function spawndoor(){
  if(frameCount % 250 === 0){
    door = createSprite(200,0);
    door.x = Math.round(random(150,400));
    door.addImage("door",doorImg);
    door.velocityY = 1;
    door.lifetime = 600;
    doorGroup.add(door);
    
    climber = createSprite(200,50);
    climber.addImage("climber",climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 600;
    climberGroup.add(climber);
 
    invisibleBlock = createSprite(200,60);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 3;
    invisibleBlock.x = climber.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth;         
    ghost.depth = ghost.depth + 1;
    
    invisibleBlock.visible = false;
  }
  
  
}