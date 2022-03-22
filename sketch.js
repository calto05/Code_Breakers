let turn = 0;
let table;
let turn0;
let turn1;
let turn2;
let turn3;
let turn4;
let pointX = 20;
let pointY = 20;
let redc;
let bluec;
let code0;
let code1;
let code2;
let done = 0;
let win = 0;

function setup() {
  createCanvas(500, 600);
  bluec = color(0, 20, 200);
  redc = color(200, 20, 0);
  code0 = floor(random(10));
  code1 = floor(random(10));
  code2 = floor(random(10));
  textSize(40)
  table = new Board(500, 600);
  turn0 = new Turn(pointX, pointY, turn);
  turn1 = new Turn(pointX, pointY + 80, turn + 1);
  turn2 = new Turn(pointX, pointY + 160, turn + 2);
  turn3 = new Turn(pointX, pointY + 240, turn + 3);
  turn4 = new Turn(pointX, pointY + 320, turn + 4);
  ans = new FinalCheck();
}

function draw() {
  background(220);
  table.display();
  turn0.display(turn);
    if(turn > 0)
      turn1.display(turn);
    if(turn > 1)
      turn2.display(turn);
    if(turn > 2)
      turn3.display(turn);
    if(turn > 3)
      turn4.display(turn);
    if(done == 1 || done == 2){
      ans.display();
    }

}

class FinalCheck{
    constructor() {
    this.x = 40;
    this.y = 60;
    this.xLoc = 260;
    this.yLoc = 80;
    this.num0 = 0;
    this.num1 = 0;
    this.num2 = 0;
    }
  
  display() {
    fill(0);
    textSize(20);
    text("Enter your answer below!", this.xLoc - 20, 40);
    
    fill(252);
    rect(this.xLoc, this.yLoc + 80, this.x + 120, 40);
    fill(0);
    textSize(30);
    if(done == 1)
      text("Submit", this.xLoc + 30, this.yLoc + 110);
    else
      text("Retry?", this.xLoc + 35, this.yLoc + 110);  
    fill(252);
    rect(this.xLoc, this.yLoc, this.x, this.y);
    fill(0);
    textSize(40);
    text(this.num0, this.xLoc + 10, this.yLoc + 45);
    
    fill(252);
    rect(this.xLoc + 60, this.yLoc, this.x, this.y);
    fill(0);
    textSize(40);
    text(this.num1, this.xLoc + 70, this.yLoc + 45);
    
    fill(252);
    rect(this.xLoc + 120, this.yLoc, this.x, this.y);
    fill(0);
    textSize(40);
    text(this.num2, this.xLoc + 130, this.yLoc + 45);
    
    if(done == 2){
      if(win == 1){
        fill(0);
        textSize(30);
        text("You Win!", this.xLoc + 20, this.yLoc + 150);
      }
      else{
        fill(0);
        textSize(30);
        text("You lose!", this.xLoc + 20, this.yLoc + 150);
      }
    }
    
    if (mouseIsPressed & mouseX < this.xLoc + this.x & mouseX > this.xLoc &                 mouseY < this.yLoc + this.y & mouseY > this.yLoc){
      if(done == 1)
        this.update(0);
    }
    
    if (mouseIsPressed & mouseX < this.xLoc + 60 + this.x & mouseX > this.xLoc + 60 &       mouseY < this.yLoc + this.y & mouseY > this.yLoc){
      if(done == 1)
        this.update(1);
    }
    
    if (mouseIsPressed & mouseX < this.xLoc + 120 + this.x & mouseX > this.xLoc + 120 &     mouseY < this.yLoc + this.y & mouseY > this.yLoc){
      if(done == 1)
        this.update(2);
    }
    
    if (mouseIsPressed & mouseX < this.xLoc + 120 + this.x & mouseX > this.xLoc &                 mouseY < this.yLoc + 120 & mouseY > this.yLoc + 80){
      if(done == 1){
        this.check();
        this.sleep(500);
      }
      else{
        turn0.reset();
        turn1.reset();
        turn2.reset();
        turn3.reset();
        turn4.reset();
        ans.reset();
        turn = 0;
        done = 0;
        win = 0;
        code0 = floor(random(10));
        code1 = floor(random(10));
        code2 = floor(random(10));
      }
    }
  }
  
  reset(){
      this.num0 = 0;
      this.num1 = 0;
      this.num2 = 0;
  }
  update(pos){
    if(pos == 0){
      if(this.num0 == 9)
        this.num0 = 0;
      else
        this.num0++;
      textSize(40);
      text(this.num0, this.xLoc + 10, this.yLoc + 45);
      this.sleep(100);
    }
    else if(pos == 1){
      if(this.num1 == 9)
        this.num1 = 0;
      else
        this.num1++;
      textSize(40);
      text(this.num1, this.xLoc + 70, this.yLoc + 45);    
      this.sleep(100);
    }
    else if(pos == 2){
      if(this.num2 == 9)
        this.num2 = 0;
      else
        this.num2++;
      textSize(40);
      text(this.num2, this.xLoc + 130, this.yLoc + 45);      
      this.sleep(100);
    }
  }
  
  check(){
    if(this.num0 == code0 & this.num1 == code1 & this.num2 == code2){
      done = 2;
      win = 1;
    }
    else
      done = 2;
  }
  
  sleep(milliseconds){
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}

class Card {
  constructor(xLoc, yLoc, pos) {
    this.x = 40;
    this.y = 60;
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.num = 0;
    this.pos = pos;

  }
  display(current) {
    if(done == 3)
      this.num = 0;
    
    fill(252);
    rect(this.xLoc, this.yLoc, this.x, this.y)
    if(turn == current & done == 0){
      fill(0);
      textSize(40);
      text(this.num, this.xLoc + 10, this.yLoc + 45);
    }
    else{
       if(this.pos == 0){
        if(this.num == code0){
          fill(bluec);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
        else if(this.num == code0 - 1 || this.num == code0 + 1){
          fill(redc);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);      
        }
        else{
          fill(0);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
      }
      else if(this.pos == 1){
        if(this.num == code1){
          fill(bluec);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
        else if(this.num == code1 - 1 || this.num == code1 + 1){
          fill(redc);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);      
        }
        else{
          fill(0);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
      }
      else if(this.pos == 2){
        if(this.num == code2){
          fill(bluec);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
        else if(this.num == code2 - 1 || this.num == code2 + 1){
          fill(redc);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);      
        }
        else{
          fill(0);
          textSize(40);
          text(this.num, this.xLoc + 10, this.yLoc + 45);
        }
      }  
    
    }

    if (mouseIsPressed & mouseX < this.xLoc + this.x & mouseX > this.xLoc     & mouseY < this.yLoc + this.y & mouseY > this.yLoc){
      if(done == 0)
        this.update(current);
    }  

  }
  
  reset(){
    this.num = 0;  
  }
  
  update(current){
    if(current == turn){
      if(this.num == 9){
        this.num = 0;
      }
      else{
        this.num++;
      }
    
    textSize(40);
    fill(0);
    text(this.num, this.xLoc + 10, this.yLoc + 45);
    this.sleep(100);
    }
    
  }
  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}

class Board{
  constructor(width, height) {
    this.total = 0;
    this.x = width;
    this.y = height;
  }
  
  display(){
    fill(252)
    rect(this.x - 101, this.y - 41, 100, 40)
    fill(0)
    textSize(20);
    text("Commit", this.x - 85, this.y - 15);
    if (mouseIsPressed & mouseX < this.x & mouseX > this.x - 101 & mouseY < this.y &       mouseY > this.y - 41){
      done = 1;
    }
    
    fill(252)
    rect(1, this.y - 41, 100, 40)
    fill(0)
    textSize(20);
    text("Guess", 20, this.y - 15);
    if (mouseIsPressed & mouseX < 100 & mouseX > 0 - 101 & mouseY < this.y &               mouseY > this.y - 41 & done != 2){
      if(done == 0){
        turn++;
        this.sleep(200);
      }
      if(turn > 4){
        done = 1;
      }
    }
  
  }
  
  sleep(milliseconds){
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
}

class Turn{
  constructor(pointX, pointY, turn) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.card1 = new Card(this.pointX, this.pointY, 0);
    this.card2 = new Card(this.pointX + 60, this.pointY, 1);
    this.card3 = new Card(this.pointX + 120, this.pointY, 2);
    this.turn = turn;
  }
  
  display(){
      this.card1.display(this.turn);
      this.card2.display(this.turn);
      this.card3.display(this.turn);
  }
  
  reset(){
    this.card1.reset();
    this.card2.reset();
    this.card3.reset();
  }
}
