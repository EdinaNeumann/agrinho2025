let ball;
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(400, 600);
  ball = new Ball();
}

function draw() {
  background(220);
  
  // Desenhar e atualizar a bola
  ball.update();
  ball.display();
  
  // Adicionar obstáculos
  if (frameCount % 60 == 0) {
    obstacles.push(new Obstacle());
  }

  // Atualizar e desenhar obstáculos
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].display();
    
    // Verificar colisões
    if (obstacles[i].hits(ball)) {
      noLoop(); // Finaliza o jogo quando há uma colisão
      textSize(32);
      fill(255, 0, 0);
      text("GAME OVER", width / 4, height / 2);
    }

    // Remover obstáculos que saíram da tela
    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
  
  // Exibir o score
  textSize(16);
  fill(0);
  text('Score: ' + score, 10, 20);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ball.move(-10);
  } else if (keyCode === RIGHT_ARROW) {
    ball.move(10);
  }
}

// Definição da classe Ball
class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.radius = 15;
  }

  update() {
    // Atualizar a posição da bola
  }

  display() {
    fill(0, 0, 255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  move(dir) {
    this.x += dir;
    this.x = constrain(this.x, 0, width); // Impede que a bola saia da tela
  }
}

// Definição da classe Obstacle
class Obstacle {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = random(20, 40);
    this.speed = random(2, 5);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  hits(ball) {
    let d = dist(this.x + this.size / 2, this.y + this.size / 2, ball.x, ball.y);
    return d < ball.radius + this.size / 2;
  }

  offscreen() {
    return this.y > height;
  }
}





