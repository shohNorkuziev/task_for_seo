class Food {
    constructor(box) {
      this.box = box;
      this.x = Math.floor(Math.random() * 15 + 1) * box;
      this.y = Math.floor(Math.random() * 15 + 1) * box;
    }
  
    draw(context) {
      context.fillStyle = "red";
      context.fillRect(this.x, this.y, this.box, this.box);
    }
  }
  
  class Board {
    constructor(canvas, box) {
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.box = box;
    }
  
    createBackground() {
      this.context.fillStyle = "lightgreen";
      this.context.fillRect(0, 0, 16 * this.box, 16 * this.box);
    }
  }
  
  class Snake {
    constructor(box) {
      this.box = box;
      this.body = [{ x: 8 * box, y: 8 * box }];
      this.direction = "right";
    }
  
    move() {
      let newHead = { ...this.body[0] };
      if (this.direction === "right") newHead.x += this.box;
      if (this.direction === "left") newHead.x -= this.box;
      if (this.direction === "up") newHead.y -= this.box;
      if (this.direction === "down") newHead.y += this.box;
      this.body.unshift(newHead);
    }
  
    checkCollision() {
      for (let i = 1; i < this.body.length; i++) {
        if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
          return true;
        }
      }
      return false;
    }
  
    draw(context) {
      for (let i = 0; i < this.body.length; i++) {
        context.fillStyle = "green";
        context.fillRect(this.body[i].x, this.body[i].y, this.box, this.box);
      }
    }
  }
  
  class Game {
    constructor(canvas, box) {
      this.board = new Board(canvas, box);
      this.snake = new Snake(box);
      this.food = new Food(box);
      this.canvas = canvas;
      this.box = box;
      this.isGameOver = false;
    }
  
    update(event) {
      switch (event.keyCode) {
        case 37:
          if (this.snake.direction !== "right") {
            this.snake.direction = "left";
          }
          break;
        case 38:
          if (this.snake.direction !== "down") {
            this.snake.direction = "up";
          }
          break;
        case 39:
          if (this.snake.direction !== "left") {
            this.snake.direction = "right";
          }
          break;
        case 40:
          if (this.snake.direction !== "up") {
            this.snake.direction = "down";
          }
          break;
      }
    }
  
    start() {
      if (this.isGameOver) {
        alert("Game Over :(");
        return;
      }
  
      this.board.createBackground();
      this.snake.move();
  
      if (this.snake.checkCollision()) {
        this.isGameOver = true;
      }
  
      if (this.snake.body[0].x === this.food.x && this.snake.body[0].y === this.food.y) {
        this.food = new Food(this.box);
      } else {
        this.snake.body.pop();
      }
  
      this.food.draw(this.board.context);
      this.snake.draw(this.board.context);
  
      if (!this.isGameOver) {
        requestAnimationFrame(() => this.start());
      }
    }
  }
  
  // Создание объекта игры и установка слушателя событий
  const canvas = document.getElementById("snake");
  const boxSize = 32;
  const game = new Game(canvas, boxSize);
  
  document.addEventListener('keydown', (event) => game.update(event));
  
  // Запуск цикла игры
  requestAnimationFrame(() => game.start());
// food, board, game , snake, render, keyBoard