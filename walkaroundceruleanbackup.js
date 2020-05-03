//import Paddle from'/src/paddle';
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
let map_img = document.getElementById("img_map");
    /*map_img.style.height = '224px';
    map_img.style.width = '399px';*/

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const level1 = [
  [ 0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1 ],
  [ 0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,0,0,0 ],
  [ 0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,0,0,0,0 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ],
  [ 0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1 ],
  [ 0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,1,1,0,0,0,0,0,0,0,0 ],
  [ 0,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0 ],
  [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0 ],
  [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0 ],
]

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
    ctx.drawImage(map_img, 0-6, 0-12, 1197, 672);
    this.gameobjects.forEach(object => object.draw(ctx));
  }


}
class Paddle {

  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 48;
    this.height = 48;
    this.pos = {
      x: this.gameWidth/2-this.width/2,
      y: this.gameHeight/2-this.height/2
    };
    this.mainpos = {
      x: 8,
      y: 6
    };
  }
  move(dir){//Moves the player in one direction and then translates everything opposite to that movement to scroll
    //also checks if there's a wall and stops the play from walking through it
    if (dir=="l" && level1[game.paddle.mainpos.y][game.paddle.mainpos.x-1] != 0) {
      this.pos.x -= game.paddle.width;
      this.mainpos.x -= 1;
      ctx.translate(game.paddle.width, 0);
    } else {
      if (dir=="r" && level1[game.paddle.mainpos.y][game.paddle.mainpos.x+1] != 0) {
        this.pos.x += game.paddle.width;
        this.mainpos.x += 1;
        ctx.translate(-game.paddle.width, 0);
      } else {
        if (dir=="u" && level1[game.paddle.mainpos.y-1][game.paddle.mainpos.x] != 0) {
          this.pos.y -= game.paddle.height;
          this.mainpos.y -= 1;
          ctx.translate(0, game.paddle.height);
        } else {
          if(dir=="d" && level1[game.paddle.mainpos.y+1][game.paddle.mainpos.x] != 0){
          this.pos.y += game.paddle.height;
          this.mainpos.y += 1;
          ctx.translate(0, -game.paddle.height);
        }
        }
      }
    }
    ctx.save();//Clear canvas
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.restore();
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  update(deltaTime) {
  }
}
class InputHandler {
  constructor(paddle) {
    //space is keycode 32
    document.addEventListener("keydown", event => {

      switch (event.keyCode) {
        case 37:
        paddle.move("l");
          break;

        case 39:
          paddle.move("r");
          break;

        case 38:
        paddle.move("u");
          break;

        case 40:
        paddle.move("d");
          break;
      }
    });

  }
}

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  game.update(deltaTime);
  game.draw(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
