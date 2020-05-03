//import Paddle from'/src/paddle';
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
canvas.style.backgroundImage = "url(th.jpeg)";
let level1 = [
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0],
];
let roomid = {
  x: 1,
  y: 1
};

let screen1 = [
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let screenPos = { x: 0, y: 0 };

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;


/*function buildLevel(){
    for(row of screen1){
      for(item of row){
        if(item == 1){
          //get position of item and display a wall there on screen
        }
        }
      }
    }*/

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }
  start() {
    this.paddle = new Paddle(this);

    this.gameobjects = [this.paddle];
    new InputHandler(this.paddle);
  }
  update(deltaTime) {
    this.gameobjects.forEach(object => object.update(deltaTime));
    //this.gameobjects = this.gameobjects.filter(object => !object.markedForDeletion);
  }
  draw(ctx) {
    this.gameobjects.forEach(object => object.draw(ctx));
  }
}

class Paddle {

  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 100;
    this.height = 100;
    /*this.maxSpeed = 7;
    this.speedx = 0;
    this.speedy = 0;*/

    this.position = { x: 0, y: 0 };
  }

  /*moveLeft() {
    this.speedx = -this.maxSpeed;
  }
  moveRight() {
    this.speedx = this.maxSpeed;
  }
  moveUp() {
    this.speedy = -this.maxSpeed;
  }
  moveDown() {
    this.speedy = this.maxSpeed;
  }

  stop() {
    this.speedx = 0;
    this.speedy = 0;
  }*/
  draw(ctx) {
    ctx.fillStyle = '#0ff';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveRoom(moveroomDir) {
    switch (moveroomDir) {
      case "l":
        roomid.x--;
        screenPos.x += 8;
        this.position.x = this.gameWidth - this.width;
        //console.warn("Room x: "+roomid.x);
        break;

      case "u":
        roomid.y--;
        screenPos.y += 6;
        this.position.y = this.gameHeight - this.height;
        console.warn("new ypos: " + screenPos.y);
        break;

      case "d":
        roomid.y++;
        screenPos.y -= 6;
        this.position.y = 0;
        console.warn("new ypos: " + screenPos.y);
        break;

      case "r":
        roomid.x++;
        screenPos.x -= 8;
        this.position.x = 0;
        //console.warn(roomid.x);
        break;
    }
  }

  update(deltaTime) {
    /*this.position.x += this.speedx;
    this.position.y += this.speedy;*/

//Moving between screens
    if (this.position.x < 0) {
      if (level1[roomid.y][roomid.x - 1] == 1) {
        this.moveRoom("l");
      } else {
        this.position.x = 0;
      }
    } //Left Wall detection

    if (this.position.x + this.width > this.gameWidth) {
      if (level1[roomid.y][roomid.x + 1] == 1) //if there's a room the player can enter
      {
        this.moveRoom("r");
      } else {
        this.position.x = this.gameWidth - this.width
      }
    } //RW Detection

    if (this.position.y + this.height > this.gameHeight) {
      if (level1[roomid.y + 1][roomid.x] == 1) {
        this.moveRoom("d");
      } else {
        this.position.y = this.gameHeight - this.height;
      }
    } //BW Detection

    if (this.position.y < 0) {
      if (level1[roomid.y - 1][roomid.x] == 1) {
        this.moveRoom("u");
      } else {
        this.position.y = 0;
      }
    }
  } //TW Detection
}

class InputHandler {
  constructor(paddle) {
    //space is keycode 32
    document.addEventListener("keydown", event => {

      switch (event.keyCode) {
        case 65: //left
        if(level1[roomid.y][roomid.x - 1] == 1 && screenPos.x == 0 || screenPos.x != 0 && screen1[screenPos.y][screenPos.x-1] == 0){
          //^^ Only move left if there's another screen to the left or if there's ground to the left
          paddle.position.x -= 100;
          screenPos.x--;
          console.warn("xpos: " + screenPos.x);
        }
          break;

        case 68: //right
        if(level1[roomid.y][roomid.x+1] == 1 && screenPos.x == 7 || screenPos.x != 7 && screen1[screenPos.y][screenPos.x+1] == 0){
          paddle.position.x += 100;
          screenPos.x++;
          console.warn("xpos: " + screenPos.x);
        }
          break;

        case 87: //up
          if(level1[roomid.y-1][roomid.x] == 1 && screenPos.y == 0 || screenPos.y != 0 && screen1[screenPos.y-1][screenPos.x] == 0){
          paddle.position.y -= 100;
          screenPos.y--;
          console.warn("ypos : " + screenPos.y);
          }
          break;

        case 83: //down
        if(level1[roomid.y+1][roomid.x] == 1 && screenPos.y == 5 || screenPos.y != 5 && screen1[screenPos.y+1][screenPos.x] ==0){
          paddle.position.y += 100;
          screenPos.y++;
          console.warn("ypos: " + screenPos.y);
        }
          break;
      }
    });

    /*document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 65:
          if (paddle.speedx < 0)
            paddle.stop();
          break;
        case 87:
          if (paddle.speedy < 0)
            paddle.stop();
          break;
        case 68:
          if (paddle.speedx > 0)
            paddle.stop();
          break;
        case 83:
          if (paddle.speedy > 0)
            paddle.stop();
          break;
      }
    });*/

  }
}


let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
