$(document).ready(function(){
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  var cw = 10;
  var fruit;
  var d = 'r';
  var snakeArray;
  var growSnake = false;
  var loss = false;

  function dropFruit(){
    fw = Math.floor(Math.random()*w/cw);
    fh = Math.floor(Math.random()*h/cw);
   
    snakeArray.map(function(point){
      if(point.x === fw && point.y === fh) dropFruit();
      else{ fruit = {x:fw, y:fh}};
    })
  }

  function init(){
    createSnake();
    dropFruit();
   setInterval(render, 60)
  }
  
  init();
  function createSnake(){
    var length = 5;
    snakeArray = [];
    for(var i = length -1; i>=0; i--){
      snakeArray.push({x:i, y:0})
    }
    console.log(snakeArray)
  }

  function containsDups(arr){
      val = false;
      for(var i = 1; i < arr.length; i++){
          for(var j = 0; j < i; j++){
              if(sameXY(arr[i],arr[j])){val = true};
          }
      }
      return val;
  }

  function sameXY(first,second){
      return first.x == second.x && first.y == second.y;
  }

  function render(){

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, w, h);

    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    if(nx == fruit.x && ny == fruit.y){
      growSnake = true;
      dropFruit();
    }

    if(d == "r")nx++;
    else if(d == "l")nx--;
    else if(d == "d")ny++;
    else if(d == "u")ny--; 

    if (nx == -1 || nx == w/cw || ny == -1 || ny == h/cw) {
      alert("You lose");
      location.reload()
    }

    if(containsDups(snakeArray)){
     alert("You lose");
     location.reload()
    }

    if(growSnake === true){
      var tail ={x:0, y:0}
      growSnake = false;
      dropFruit();
    }
    else{
      var tail = snakeArray.pop()
    } 
    tail.x = nx;
    tail.y = ny;
    snakeArray.unshift(tail);

    for(var i = 0; i < snakeArray.length; i++)
        {
          var c = snakeArray[i];
          paint(c.x, c.y, 'blue');
        }  
    paint(fruit.x, fruit.y, 'red');
    function paint(x,y,colour){
      
      ctx.fillStyle = colour;
      ctx.fillRect(x*cw, y*cw, cw, cw);
      ctx.strokeStyle = "white";
      ctx.strokeRect(x*cw, y*cw,cw,cw);
    }

  }
  $(document).keydown(function(e){
    var key = e.which;
    if(key == "38" && d != 'd') d = 'u'
    else if(key == "40" && d != 'u') d = 'd'
    else if(key == "37" && d != 'r') d = 'l'
    else if(key == "39" && d != 'l') d = 'r'
  })
})