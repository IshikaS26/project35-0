var balloon,balloonImage1,balloonImage2;
var database ; 
var position ;

function preload(){
  bg =loadImage("cityImage.png");
  balloonImage=loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(1000,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;
 

  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight, showError);

 
}


function draw() {
  background(bg);
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.x = balloon.x-15;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.x = balloon.x+15;
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.y = balloon.y-15;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.y =balloon.y+15;
  }

  if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.scale = balloon.scale-0.01;
  }

  if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    balloon.scale = balloon.scale+0.01;
  }
  drawSprites();
  fill("black");
  textSize(25);
  text("Use arrow keys to move the hot air balloon!",40,40)
}

function updateHeight(x,y){
   database.ref('balloon/height').set({
   'x' : updateHeight.x + x ,
   'y' : updateHeight.y + y 
   })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}