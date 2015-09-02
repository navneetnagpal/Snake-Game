 /* Javascript *?*/

 
 var snakeCanvas = document.getElementById('canvas');
 var context = snakeCanvas.getContext("2d");
 var sAW = document.getElementById('canvas').getAttribute('width');
 var sAH = document.getElementById('canvas').getAttribute('height');
 var snakeDirection,snake,cw=16;
 var prey;
 var score;
 //snakeDirection = 'right';

 start = function(){
 	score=0;
 	snakeDirection = 'right';
 	babySnake();
 	snakePrey();


 	if(typeof game_loop != "undefined") clearInterval(game_loop);
 	game_loop = setInterval(paint, 80);
 };
 start();
//setInterval(paint, 80);
 setInterval(function (){snakePrey()},getRandomInt(4000,10000));

 function babySnake(){
 	var snakeSize = 4;
 	snake=[];
 	for(q=snakeSize-1;q>=0;q--){
 		snake.push({x:q,y:0});
 	}
 };

 function paint()
 {
 	context.fillStyle = "white";
 	context.fillRect(0, 0, sAW, sAH);
 	context.strokeStyle = "black";
 	context.strokeRect(0, 0, sAW, sAH);
 	if(snake[0] != undefined){
 		
 		var lastItemX = snake[0].x;
 	
 		var lastItemY = snake[0].y;
 		if(snakeDirection=='right')
 			lastItemX++;
 		if(snakeDirection=='left')
 			lastItemX--;
 		if(snakeDirection=='up')
 			lastItemY--;
 		if(snakeDirection=='down')
 			lastItemY++;
 	}

 		
 		if(lastItemX == -1 || lastItemX == Math.floor(sAW/cw) || lastItemY == -1 || lastItemY== Math.floor(sAH/cw) ||selfDestruction(lastItemX,lastItemY,snake))		{
 			
 			var rSize;
 			if(parseInt(sAW)>113){
 				rSize= parseInt(sAW);
 				rSize = rSize-113;
 				rSize = String(rSize);
 				sAW = rSize;
				sAH=rSize;
 				snakeCanvas.width=rSize;
 				snakeCanvas.height=rSize;
 				
 				//sAW=rSize;			
 			}else{
 				//window.location = "http://localhost:8888/"
 				document.getElementById('play').style.visibility = "visible";

 			}
 			
 			start();
			//
			return;
		}
		
		if(prey!=undefined){
		if(lastItemX==prey.x && lastItemY==prey.y){
			var t = {x:lastItemX,y:lastItemY};
			score++;
			snakePrey();

		}else{

			var t = snake.pop();
			t.x = lastItemX;
			t.y=lastItemY;
		}
		snake.unshift(t);
	}
		for(var i = 0; i < snake.length; i++)
		{
			var c = snake[i];
			//Lets paint 10px wide cells
			snakeAndPreyColor(c.x,c.y,'grey');
		}

		snakeAndPreyColor(prey.x,prey.y,'lightgreen');
		var displayScore = "Score : "+ score;
		var gradient = context.createLinearGradient(0, 0, snakeCanvas.width, 0);
		gradient.addColorStop("0", "magenta");
		gradient.addColorStop("0.5", "blue");
		gradient.addColorStop("1.0", "red");
		// Fill with gradient
		context.font="15px Verdana";
		context.fillStyle = gradient;
		context.fillText(displayScore, cw, sAH-cw);


}


	//paint();

	function snakeAndPreyColor(x, y, z)
	{
		context.fillStyle = z;
		context.fillRect(x*cw, y*cw, cw, cw);
		context.strokeStyle = "white";
		context.strokeRect(x*cw, y*cw, cw, cw);
	}

	document.body.addEventListener('keydown', function(event) {
		var key = event.keyCode;
		if(key == "37" && snakeDirection != "right") snakeDirection = "left";
		else if(key == "38" && snakeDirection != "down") snakeDirection = "up";
		else if(key == "39" && snakeDirection != "left") snakeDirection = "right";
		else if(key == "40" && snakeDirection != "up") snakeDirection = "down";
	});

	function snakePrey(){
		prey={
			x:Math.round(Math.random()*(sAW-cw)/cw),
			y:Math.round(Math.random()*(sAH-cw)/cw),

		};
	}

	function selfDestruction(x, y, arr) {

		for (var i = 0; i < arr.length; i++) {
			if (arr[i].x == x && arr[i].y == y) return true;
		}
		return false;
	}
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

function playAgain(){

	//document.getElementById('play').style.visibility = "visible";
	window.location.href ="http://localhost:8888/";
	
}


	


	

