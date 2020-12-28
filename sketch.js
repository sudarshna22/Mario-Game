var ground, groundImg, mario, marioImg, marioCollidedImg;
var background1, backgroundImg;
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacleGroup;
var brick1, brick2, brick3, brick4, brick5, brick6, brickImg1, brickImg2, brickImg3, brickImg4, brickImg5, brickImg6, brick1Group, brick2Group, brick3Group, brick4Group, brick5Group, brick6Group;
var score = 0;
var gameState = "play";
var gameOver, gameOverImg;
var restart, restartImg;

function preload() {
  backgroundImg = loadImage("bg.png");
  groundImg = loadImage("ground2.png");
  marioImg = loadAnimation("mario00.png", "mario01.png", "mario02.png", "mario03.png");
  marioCollidedImg = loadImage("collided.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  brickImg1 = loadImage("brick.png");
  brickImg2 = loadImage("brick.png");
  brickImg3 = loadImage("brick.png");
  brickImg4 = loadImage("brick.png");
  brickImg5 = loadImage("brick.png");
  brickImg6 = loadImage("brick.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);

  background1 = createSprite(300, 200, 600, 400);
  background1.addImage("background", backgroundImg);

  ground = createSprite(300, 370, 20, 30);
  ground.addImage("ground", groundImg);
  ground.velocityX = -6;

  mario = createSprite(50, 310, 20, 30);
  mario.addAnimation("running", marioImg);
  mario.addAnimation("collided", marioCollidedImg);

  obstacleGroup = new Group();
  brickGroup = new Group();

  gameOver = createSprite(300, 130, 10, 20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(300, 160, 10, 20);
  restart.addImage(restartImg);
  restart.scale = 0.5;

  brick1Group = new Group();
  brick2Group = new Group();
  brick3Group = new Group();
  brick4Group = new Group();
  brick5Group = new Group();
  brick6Group = new Group();


}

function draw() {
  background("white");

  if (gameState === "play") {

    gameOver.visible = false;
    restart.visible = false;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if ((touches.length>0 || keyDown("space")) && mario.y > 150) {
      mario.velocityY = -6;
      touches=[];
    }

    mario.velocityY = mario.velocityY + 0.5;

    if (brick1Group.isTouching(mario)) {
      brick1Group.destroyEach();
      score = score + 1;
    } else if (brick2Group.isTouching(mario)) {
      brick2Group.destroyEach();
      score = score + 1;
    } else if (brick3Group.isTouching(mario)) {
      brick3Group.destroyEach();
      score = score + 1;
    } else if (brick4Group.isTouching(mario)) {
      brick4Group.destroyEach();
      score = score + 1;
    } else if (brick5Group.isTouching(mario)) {
      brick5Group.destroyEach();
      score = score + 1;
    } else if (brick6Group.isTouching(mario)) {
      brick6Group.destroyEach();
      score = score + 1;
    }

    spawnObstacle();
    brick();

    if (obstacleGroup.isTouching(mario)) {
      gameState = "end";
      ground.velocityX = 0;
      mario.velocityY = 0;
      mario.changeAnimation("collided", marioCollidedImg);
    }
  }

  if (gameState === "end") {

    gameOver.visible = true;
    restart.visible = true;

    obstacleGroup.setVelocityXEach(0);
    brick1Group.setVelocityXEach(0);
    brick2Group.setVelocityXEach(0);
    brick3Group.setVelocityXEach(0);
    brick4Group.setVelocityXEach(0);
    brick5Group.setVelocityXEach(0);
    brick6Group.setVelocityXEach(0);


    obstacleGroup.setLifetimeEach(-1);
    brick1Group.setLifetimeEach(-1);
    brick2Group.setLifetimeEach(-1);
    brick3Group.setLifetimeEach(-1);
    brick4Group.setLifetimeEach(-1);
    brick5Group.setLifetimeEach(-1);
    brick6Group.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      gameState = "play";
      obstacleGroup.destroyEach();
      brick1Group.destroyEach();
      brick2Group.destroyEach();
      brick3Group.destroyEach();
      brick4Group.destroyEach();
      brick5Group.destroyEach();
      brick6Group.destroyEach();
      score = 0;
      mario.changeAnimation("running", marioImg);
    }
  }


  mario.collide(ground);



  drawSprites();

  fill("black")
  text("score:" + score, 500, 30);
}

function spawnObstacle() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600, 310, 10, 10);
    obstacle.velocityX = -6;

    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      default:
        break;
    }

    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);

  }
}

function brick() {

  var rand1 = Math.round(random(1, 6));

  if (frameCount % 60 === 0) {

    if (rand1 === 1) {
      brick1 = createSprite(600, Math.round(random(180, 250)), 10, 10);
      brick1.addImage(brickImg1);
      brick1.velocityX = -6;
      brick1.lifetime = 100;
      brick1Group.add(brick1);
    } else if (rand1 === 2) {
      brick2 = createSprite(600, Math.round(random(180, 250)), 10, 10);
      brick2.addImage(brickImg2);
      brick2.velocityX = -6;
      brick2.lifetime = 100;
      brick2Group.add(brick2);
    } else if (rand1 === 3) {
      brick3 = createSprite(600, Math.round(random(180, 250)), 10, 10);
      brick3.addImage(brickImg3);
      brick3.velocityX = -6;
      brick3.lifetime = 100;
      brick3Group.add(brick3);
    } else if (rand1 === 4) {
      brick4 = createSprite(600, Math.round(random(180, 250)), 10, 10);
      brick4.addImage(brickImg4);
      brick4.velocityX = -6;
      brick4.lifetime = 100;
      brick4Group.add(brick4);
    } else if (rand1 === 5) {
      brick5 = createSprite(600, Math.round(random(180, 250)), 10, 10);
      brick5.addImage(brickImg5);
      brick5.velocityX = -6;
      brick5.lifetime = 100;
      brick5Group.add(brick5);
    } else if (rand1 === 6) {
      brick6 = createSprite(600, Math.round(random(180, 250)), 10, 10);

      brick6.addImage(brickImg6);
      brick6.velocityX = -6;
      brick6.lifetime = 100;
      brick6Group.add(brick6);
    }

  }



}