window.onload = function(){
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    this.document.addEventListener("keydown", keyPush);
    this.setInterval(game, 1000/15);
}

px = py = 10;
xv = yv = 0;
gs = tc = 20;
ax = ay = 0;
snake = [];
tail = 5;
score = 0;
lastXv = lastYv = 0;

function game(){

    //You can't move to behind
    //For example: 
    //While you are going to right, you can't go to left
    if(lastXv != xv * -1 || lastYv != yv * -1){
        px += xv;
        py += yv;

        lastXv = xv;
        lastYv = yv;
    }
    else{
        px += xv * -1;
        py += yv * -1;
    }
    
    if(px < 0){
        px = tc - 1;
    }
    if(px > tc - 1){
        px = 0;
    }
    if(py < 0){
        py = tc - 1;
    }
    if(py > tc - 1){
        py = 0;
    }

    //Background color of map
    ctx.fillStyle = "black";    
    ctx.fillRect(0, 0, canv.width, canv.height);

    //Color of snake
    ctx.fillStyle = "lime";
    for(var i=0; i<snake.length; i++){
        ctx.fillRect(snake[i].x * gs, snake[i].y * gs, gs - 2, gs - 2);
        if(snake[i].x == px && snake[i].y == py){
            tail = 5;
            score = 0;
        }
    }
    snake.push({x: px, y: py});
    while(snake.length > tail){
        snake.shift();
    }
    //ctx.fillRect(px * gs, py * gs, gs, gs);
    
    //If snake eat the apple, make a new apple
    if(ax == px && ay == py){
        tail++;
        score++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
        console.log("SCORE: " + score);
    }

    //Color of apple
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs, gs);
}

function keyPush(e){
    switch(e.keyCode){
        case 37:
            xv=-1; yv=0;
            //move(xv, yv);
            break;
        case 38:
            xv=0; yv=-1;
            //move(xv, yv);
            break;
        case 39:
            xv=1; yv=0;
            //move(xv, yv);
            break;            
        case 40:
            xv=0; yv=1;
            //move(xv, yv);
            break;    
    }
}

function move(gsx, gsy){
    px += gsx;
    py += gsy;

    if(px < 0) {
        px = tc - 1;
    }
    if(px > tc - 1){
        px = 0;
    }
    if(py < 0){
        py = tc - 1;
    }
    if(py > tc - 1){
        py = 0;
    }
}