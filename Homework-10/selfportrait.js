xh= 250
yh = 60
xb= 165
yb= 50
tsize = 35
tx = 260
movement = .1

angleRight = 0;
angleLeft = 0;
let speedRight;
let speedLeft;

textsize1 = 22;
growing = true;

function setup()
{
  createCanvas(500, 600);
 speedRight = random(0.01, 0.05);
speedLeft = random(0.01, 0.05);
}

function draw()
{
  background(152, 3, 252);
  textSize(textsize1)
  text("Look Ma, I'm Drawing!!!", 12,500);
  fill('limegreen');

  if (growing) {
  textsize1 += 1;
  if (textsize1 >= 22 * 5) { // 5 times the original size
    growing = false;
  }
  } else {
  textsize1 -= 1;
  if (textsize1 <= 22) { // Back to the original size
    growing = true;
  }
  }

  // head
  strokeWeight(5);
  fill(245, 172, 132);
  circle(250,100,175);
  
 
  // eye balls
  strokeWeight(1)
  fill(255, 233, 199);
  circle(200,75,20);
  circle(285,75,20);
 
  // pupils
  strokeWeight(0)
  fill(64, 92, 247);
  circle(200,75,8);
  circle(285,75,8);

  // eyes
  strokeWeight(2);
  fill(0);
  point(200,75);
  point(285,75);

  // nose
  strokeWeight(10)
  point(245,90);

  
  // mouth
  push()
  strokeWeight(0)
  fill(0)
  ellipse(245, 135, 55, 25)
  pop()
  // tounge
  push()
  strokeWeight(0)
  fill(255, 48, 93)
  ellipse(tx, 135, tsize,15)
  pop()
  if (tsize >= 35)
    {
      tsize += 1.2;
    }
  if (tx >= 35)
    {
      tx += .6;
    }

  // hair
  push()
  stroke(145, 67, 7)
  line(160,120,200,60);
  line(165,125,195,60);
  line(155,115,190,60);
  line(150,110,185,60);
  line(145,110,175,60);
  pop()

  // hat
  function hat(){
  
  push()
  strokeWeight(0)
  fill(35, 79, 16)
  arc(xh, yh, 180, 200, PI, TWO_PI);
  rect(xb,yb,210,10)
  pop()
  
  }
  hat()
  if(yh >= 60 || yh <= 40)
    {
      movement *= -1;
    }
    
    
      yh += movement
    
  if(yb >= 50 || yb <= 40)
    {
      movement *= -1;
    }
    
    
      yb += movement
  // body
  fill(110, 118, 145);
  rect(200,185,100,150);
  
  // decoration
  fill(255);
  ellipse(220,230,2,25)
  ellipse(280,230,2,25)
  arc(248, 260, 10, 10, 0, PI + QUARTER_PI);

  // Right arm pivot
  push();
  fill(10, 24, 120);
  translate(300, 195); 
  rotate(angleRight); 
  rect(0, 0, 50, 10); 
  pop();

  // Left arm pivot
  push();
  fill(10, 24, 120);
  translate(190, 195); 
  rotate(-angleLeft); 
  rect(0, 0, 50, 10);
  pop();


  angleRight += speedRight;
  angleLeft += speedLeft;


  // left leg
  rect(200,335,10,50);
  // right leg
  rect(290,335,10,50);
  
  fill(120);
  textSize(22);
  text("Ben Fredrickson",270,575 );
  fill('limegreen');


}