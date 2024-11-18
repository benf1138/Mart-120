let character;
let rectangles = [];
let score = 0;
let gameOver = false;
let startTime;

function setup() {
  createCanvas(1000, 400);
  character = new Character();
  startTime = millis(); 

  
  setInterval(() => {
    if (!gameOver) {
      rectangles.push(new FallingRect());
    }
  }, 100);
}

function draw() {
  background(0);

  
  fill(0);
  textSize(24);
  text(`Score: ${score}`, 10, 30);

  if (gameOver) {
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
    textSize(24);
    text(`Final Score: ${score}`, width / 2, height / 2 + 50);
    noLoop();
    return;
  }

  
  let elapsedTime = (millis() - startTime) / 1000;
  if (elapsedTime >= 30) {
    gameOver = true;
    fill(0, 255, 0);
    textSize(48);
    text("Time's Up!", width / 2, height / 2);
    textSize(24);
    text(`Final Score: ${score}`, width / 2, height / 2 + 50);
    noLoop();
    return;
  }

  character.display();
  character.move();

  for (let i = rectangles.length - 1; i >= 0; i--) {
    rectangles[i].display();
    rectangles[i].move();

    if (rectangles[i].collidesWith(character)) {
      gameOver = true;
      fill(255, 0, 0);
      textSize(48);
      text("Game Over", width / 2, height / 2);
      textSize(24);
      text(`Final Score: ${score}`, width / 2, height / 2 + 50);
      noLoop(); 
      return;
    }

    if (rectangles[i].offScreen()) {
      score += 10;
      rectangles.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT && !gameOver) {
    rectangles.push(new FallingRect());
  }
}

class Character {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 30;
    this.speed = 5;
  }

  display() {
    fill(50, 150, 250);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    this.x = constrain(this.x, 0, width - this.size);
  }
}

class FallingRect {
  constructor() {
    this.x = random(width); 
    this.y = -20; 
    this.width = random(20, 50); 
    this.height = random(20, 50); 
    this.speed = random(2, 5); 
  }

  display() {
    fill(255, 100, 100); 
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.speed;
  }

  offScreen() {
    return this.y > height; 
  }

  collidesWith(character) {
    return (
      this.x < character.x + character.size &&
      this.x + this.width > character.x &&
      this.y < character.y + character.size &&
      this.y + this.height > character.y
    );
  }
}
