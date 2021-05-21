var dog,dogImg,dogImgh,database,foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImgh=loadImage("Images/happy dog.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImgh);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Press UP ARROW Key To Feed Milk!",130,10,300,20);
}


function readStock(data){
  foodS=data.val();
}


function writeStock(x){
  if(x<=0){
    x=0;
   }else{
    x=x-1;
   } 
  database.ref('/').update({
    Food:x
  })
}