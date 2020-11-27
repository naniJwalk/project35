//Create variables here
var dog, dogImage, happyDog;
var foodS,foodStock;
var database;
var feed, addFood;
var fedTime, lastFed;
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png");
  backgroundImg=loadImage(foodImage);
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();
  dog=createSprite(250,300,150,150);
  dog.scale=0.25;
  dog.addImage(dogImage);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  textSize(13);
  fill("blue");
  stroke(3);
  text("I WANT FOOD",410,10);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12 +"PM", 350,30);
  } else if(lastFed==0){
text("Last Feed : 12 AM",350,30);
  } else{
    text("Last Feed : "+lastFed +"AM",350,30);
  }
  
fedTime=database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
});
  drawSprites();
  //add styles here

}
async function getBackgroundImg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  
  if(hour>=1200 && hour<=2400){
    foodImage = "images/milk.png";
}
else{
    foodImage=null;
}

backgroundImg = loadImage(foodImage);
  
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
   } else{
     x=x-1;
   }
  database.ref('/').update({
    Food:x
  })
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



