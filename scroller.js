let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
let map_img = document.getElementById("img_map");
const GAMESTATE = {
  menu: 0,
  overworld: 1,
  battle: 2,
}
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
/*const game.level1 = [
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
]*/
const route11 = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,0,0,1,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,1,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,0,0,0,0,0,0,0],

]

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.level = route11;
  }
  start() {
    this.gamestate = GAMESTATE.overworld;
    this.player = new Player(this);
    this.gameobjects = [this.player];
    new InputHandler(this.player, this);
  }
  update(deltaTime) {
    this.gameobjects.forEach(object => object.update(deltaTime));
    //this.gameobjects = this.gameobjects.filter(object => !object.markedForDeletion);
  }
  draw(ctx) {//912 416 57 26
    ctx.drawImage(map_img, 256, -384, 16*228, 16*104);
    this.gameobjects.forEach(object => object.draw(ctx));
  }
  togglemenu(){
    if(this.gamestate == GAMESTATE.menu){
      //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
      //ctx.restore();
      this.gamestate = GAMESTATE.overworld;
    }else if(this.gamestate == GAMESTATE.overworld){
      //ctx.save();
      this.gamestate = GAMESTATE.menu;
    }
    console.warn("Gamestate: " + this.gamestate);
  }
}
class Player {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 64;
    this.height = 64;
    this.pos = {
      x: 64*4,
      y: 64*4
    };
    this.mainpos = {
      x: 0,
      y: 10
    };
    this.hp = 50;
    this.damage = 8;
  }
  move(dir){//Moves the player in one direction and then translates everything opposite to that movement to scroll
    //also checks if there's a wall and stops the play from walking through it
    if (dir=="l" && game.level[this.mainpos.y][this.mainpos.x-1] != 0) {
      this.pos.x -= this.width;
      this.mainpos.x -= 1;
      ctx.translate(this.width, 0);
    } else {
      if (dir=="r" && game.level[this.mainpos.y][this.mainpos.x+1] != 0) {
        this.pos.x += this.width;
        this.mainpos.x += 1;
        ctx.translate(-this.width, 0);
      } else {
        if (dir=="u" && game.level[this.mainpos.y-1][this.mainpos.x] != 0) {
          this.pos.y -= this.height;
          this.mainpos.y -= 1;
          ctx.translate(0, this.height);
        } else {
          if(dir=="d" && game.level[this.mainpos.y+1][this.mainpos.x] != 0){
          this.pos.y += this.height;
          this.mainpos.y += 1;
          ctx.translate(0, -this.height);
        }
        }
      }
    }
    ctx.save();//Clear canvas
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.restore();

      if(game.level[this.mainpos.y][this.mainpos.x] == 2){
        let grassstep = Math.floor(Math.random() * 11);
        if(grassstep == 1){
          console.warn("Battle!");
        }
      }
  }

  draw(ctx) {
    ctx.fillStyle = '#0f0';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  update(deltaTime) {
  }
}
class InputHandler {
  constructor(player, game) {
    //space is keycode 32
    document.addEventListener("keydown", event => {

      switch (event.keyCode) {
        case 27:
        game.togglemenu();
        break;
        case 37:
        if(game.gamestate == GAMESTATE.overworld){
          player.move("l");
        }
          break;

        case 39:
        if(game.gamestate == GAMESTATE.overworld){
          player.move("r");
        }
          break;

        case 38:
        if(game.gamestate == GAMESTATE.overworld){
          player.move("u");
        }
          break;

        case 40:
        if(game.gamestate == GAMESTATE.overworld){
          player.move("d");
        }
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
