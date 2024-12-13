let rotationAngle = 0; 
let bullets = []; 
let asteroids = [];
let score = 0; 

function setup() {
  createCanvas(windowWidth, windowHeight); 
  noStroke();

  
  spawnAsteroids();
}

function spawnAsteroids() {
  for (let i = 0; i < 5; i++) {
    let edge = random(["top", "bottom", "left", "right"]);
    let x, y;
    if (edge === "top") {
      x = random(width);
      y = 0;
    } else if (edge === "bottom") {
      x = random(width);
      y = height;
    } else if (edge === "left") {
      x = 0;
      y = random(height);
    } else {
      x = width;
      y = random(height);
    }
    asteroids.push({
      x: x,
      y: y,
      speed: random(0.2, 1), 
      size: random(20, 50),
    });
  }
}

let stars = [];
let gameOver = false;

function draw() {
  if (gameOver) {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Game Over", width / 2, height / 2 - 30);
    textSize(24);
    text("Press 'R' to Restart", width / 2, height / 2 + 30);

    
    textSize(32);
    text("Score: " + score, width / 2, height / 2 + 70);
    return;
  }

  background(0); 



  if (stars.length === 0) {
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: random(width),
        y: random(height),
        size: random(1, 3),
        brightness: random(150, 255),
        twinkleSpeed: random(0.5, 1.5),
      });
    }
  }

  for (let star of stars) {
    star.brightness += sin(frameCount * star.twinkleSpeed) * 50;
    star.brightness = constrain(star.brightness, 150, 255); 
    fill(star.brightness);
    ellipse(star.x, star.y, star.size);
  }

  if (keyIsDown(LEFT_ARROW)) {
    rotationAngle -= 0.05;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    rotationAngle += 0.05;
  }
  //lets the ship keep moving if you hold the keys down
  //made it feel a lot less clunky


  // for my "ship"
  push();
  translate(width / 2, height / 2); 
  rotate(rotationAngle); 
  fill(255, 0, 0);
  triangle(-30, -20, -30, 20, 30, 0);
  pop();


  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    fill(255, 255, 0);
    ellipse(bullet.x, bullet.y, 5, 5);


    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

// for getting the bullts off the screen
    if (bullet.x < 0 || bullet.x > width || bullet.y < 0 || bullet.y > height) {
      bullets.splice(i, 1);
    }
  }


  for (let i = asteroids.length - 1; i >= 0; i--) {
    let asteroid = asteroids[i];
    fill(100, 100, 100); 
    ellipse(asteroid.x, asteroid.y, asteroid.size, asteroid.size); 



    let angle = atan2(height / 2 - asteroid.y, width / 2 - asteroid.x);
    asteroid.x += cos(angle) * asteroid.speed;
    asteroid.y += sin(angle) * asteroid.speed;

 //for bullets hitting the astroid 
    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      let distance = dist(asteroid.x, asteroid.y, bullet.x, bullet.y);
      if (distance < asteroid.size / 2) {
        asteroids.splice(i, 1);
        bullets.splice(j, 1);
        score += 1000;

        break;
      }
    }

// for if the ship gets hit
    let shipDistance = dist(asteroid.x, asteroid.y, width / 2, height / 2);
    if (shipDistance < asteroid.size / 2 + 30) {
      gameOver = true;
    }
  }


  if (frameCount % 300 === 0) { 
    spawnAsteroids();
  }


  fill(255);
  textAlign(LEFT, TOP);
  textSize(32);
  text("Score: " + score, 20, 20);
}


//to move the ship
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rotationAngle -= 0.1; 
  } else if (keyCode === RIGHT_ARROW) {
    rotationAngle += 0.1; 
  } else if (key === ' ') {
    let bulletSpeed = 10;
    let bullet = {
      x: width / 2 + cos(rotationAngle) * 30,
      y: height / 2 + sin(rotationAngle) * 30,
      vx: cos(rotationAngle) * bulletSpeed,
      vy: sin(rotationAngle) * bulletSpeed,
    };
    bullets.push(bullet);
  } else if (key === 'r' && gameOver)//will restart the game
     {
    gameOver = false;
    score = 0;
    asteroids = [];
    bullets = [];
    spawnAsteroids();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
