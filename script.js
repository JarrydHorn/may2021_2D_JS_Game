var ctx = null;
var tileW = 45, tileH = 45;
var mapW = 20, mapH = 10;
var enemyCount = 0;
var points = 0, lives = 3;
var currentSecond = 0, fps= 0, framesLastSecond=0, frameCount=0;
var lastFrameTime = 0;
var input = [0,0]; // user input from arrow keys
let sprite = document.getElementById("sprite");
var pickup = new Audio('sound/coins.mp3');
var death = new Audio('sound/scream.mp3');
var lvl1 = new Audio('sound/level1.mp3');
var lvl2 = new Audio('sound/level2.mp3');
var lvl3 = new Audio('sound/level3.mp3');
var bgMusic = lvl1;
bgMusic.play();
bgMusic.loop = true;
level=1;

var keysDown = {
	82: false,
	70: false,
	37: false,
	38: false,
	39: false,
	40: false,
};

var player = new Character(1,1);
var enemies = [];
var golds = [];
var ePos = [[1,8],[16,1],[16,8]];
enemyCount = ePos.length;
for(var i=0; i<enemyCount; i++){
	var newEnemy = new Character(ePos[i][0],ePos[i][1]);
	enemies.push(newEnemy);
	var newGold = new Character(ePos[i][0],ePos[i][1]);
	golds.push(newGold);
}

var gameMap = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,
	0,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,
	0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,
	0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,
	0,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,
	0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];


function levelOne()
{
	gameMap = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,
	0,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,
	0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,
	0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,
	0,1,0,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,1,0,
	0,1,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,1,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	];
	enemyCount = 3;
	ePos = [[1,8],[16,1],[16,8]];
}

function levelTwo()
{
	gameMap = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,1,0,0,0,1,1,1,1,1,1,1,0,1,0,0,1,1,1,0,
	0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,
	0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,
	0,1,1,1,1,1,0,0,1,1,1,0,0,1,0,0,1,0,1,0,
	0,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,
	0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,
	0,1,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,1,0,
	0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	];
	enemyCount = 4;
	ePos = [[1,8],[16,1],[16,8],[9,4]];
	var newEnemy = new Character(9,4);
	enemies.push(newEnemy);
	var newGold = new Character(9,4);
	golds.push(newGold);
}

function levelThree()
{
	gameMap = [
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,
	0,1,0,0,1,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,
	0,1,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,
	0,1,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,
	0,1,0,0,0,0,1,1,0,1,0,1,1,0,0,0,0,1,0,0,
	0,1,0,0,0,1,1,0,0,1,0,0,1,1,0,0,0,1,0,0,
	0,1,0,0,1,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,
	0,1,1,1,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,
	0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
	];
	enemyCount = 5;
	ePos = [[1,8],[16,1],[16,8],[9,4],[6,6]];
	var newEnemy = new Character(6,6);
	enemies.push(newEnemy);
	var newGold = new Character(6,6);
	golds.push(newGold);
}

function Character(ix,iy)
{
	this.sx = 0;
	this.sy = 0;
	this.timeMoved = 0;
	this.dimensions = [tileW*1.25,tileH*1.5];
	this.position = [((tileW*ix) + ((tileW-this.dimensions[0])/2)), ((tileH*iy) + ((tileH-this.dimensions[1])/2))];
	this.tileFrom = [ix,iy];
	this.tileTo = [ix,iy];
	this.delayMove = 200;
}
Character.prototype.reset = function(x,y)
{
	this.timeMoved = 0;
	this.position = [((tileW*x) + ((tileW-this.dimensions[0])/2)), ((tileH*y) + ((tileH-this.dimensions[1])/2))];
	this.tileFrom = [x,y];
	this.tileTo = [x,y];	
}

Character.prototype.placeAt = function(x,y){
	this.tileFrom = [x,y];
	this.tileTo = [x,y];
	this.position = [((tileW*x) + ((tileW-this.dimensions[0])/2)), ((tileH*y) + ((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t)
{
	if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]) { return false; }
	if((t-this.timeMoved) >= this.delayMove){
		this.placeAt(this.tileTo[0], this.tileTo[1]);
	}else{
		this.position[0] = (this.tileFrom[0]*tileW) + ((tileW - this.dimensions[0])/2);
		this.position[1] = (this.tileFrom[1]*tileH) + ((tileH - this.dimensions[1])/2);
		
		if(this.tileTo[0] != this.tileFrom[0]){
			var diff = (tileW / this.delayMove)*(t - this.timeMoved);
			this.position[0]+=(this.tileTo[0] < this.tileFrom[0] ? 0-diff : diff); // if moving left -> -diff, if moving right -> +diff
		}
		if(this.tileTo[1] != this.tileFrom[1]){
			var diff = (tileH / this.delayMove)*(t - this.timeMoved);
			this.position[1]+=(this.tileTo[1] < this.tileFrom[1] ? 0-diff : diff); 
		}
		this.position[0] = Math.round(this.position[0]);
		this.position[1] = Math.round(this.position[1]);	
	}
	return true;
};
Character.prototype.trySetTo = function(move, t)
{
	if(gameMap[toIndex(this.tileFrom[0]+move[0], this.tileFrom[1]+move[1])]==1)
	{
		this.tileTo[1] += move[1];
		this.tileTo[0] += move[0];
	}	
	if(this.tileFrom[0]!=this.tileTo[0] || this.tileFrom[1]!=this.tileTo[1])
	{
		this.timeMoved = t;
	}
};

function toIndex(x,y){
	return ((y*mapW)+x);
}

function reset(){
	bgMusic.pause();
	player.reset(1,1);
	for(var i=0; i<enemyCount; i++)
	{
		enemies[i].reset(ePos[i][0],ePos[i][1]);
	}
	keysDown = {
		82: false,
		70: false,
		37: false,
		38: false,
		39: false,
		40: false,
	};
	if(level==1)
	{
		levelOne();
		bgMusic = lvl1;
	} else if(level==2)
	{
		levelTwo();
		bgMusic = lvl2;
	} else if(level==3)
	{
		levelThree();
		bgMusic = lvl3;
	} else if(level==4)
	{
		levelOne();
		bgMusic = lvl1;
		level=1;
	}
	bgMusic.play();
}

function unStick(){
	keysDown = {
		82: false,
		70: false,
		37: false,
		38: false,
		39: false,
		40: false,
	};
}

window.onload = function(){
	ctx = document.getElementById('game').getContext('2d');
	requestAnimationFrame(drawGame);
	ctx.font = "bold 16pt sans-serif";
	

	window.addEventListener("keydown", function(e)
	{
		if(e.keyCode>=37 && e.keyCode<=40 || e.keyCode==82){
			keysDown[e.keyCode] = true;
		}
	});
	window.addEventListener("keyup", function(e)
	{
		if(e.keyCode>=37 && e.keyCode<=40 || e.keyCode==82){
			keysDown[e.keyCode] = false;
		}
	});
};

function drawMap()
{
	var i=0,j=0;
	for(var y=0; y<mapH; y++)
	{
		for(var x=0; x<mapW; x++)
		{
			switch(gameMap[((y*mapW)+x)])
			{
				case 0:
					if(level==1){i=310; j=550;}
					else if(level==2){i=505; j=280;}
					else if(level==3){i=310; j=380;}
					break;
				default:
					if(level==1){i=300; j=640;}
					else if(level==2){i=550; j=870;}
					else if(level==3){i=600; j=280;}
			}
			ctx.drawImage(document.getElementById("tilemap"),i,j,50,50,x*tileW,y*tileH,tileW,tileH);
		}
	}
}

function getInput()
{
	var x = 0;
	var y = 0;
	
	if(keysDown[38]){ y--; player.sy = 1;}
	if(keysDown[40]){ y++; player.sy = 0;}
	if(keysDown[37]){ x--; player.sy = 2;}
	if(keysDown[39]){ x++; player.sy = 3;}
	if(keysDown[82]){ level++; reset(); console.log(level); }
	unStick();
	input = [x,y];
}

function checkCollision()
{
	var remainingGold = enemyCount;
	for(var i=0; i<enemyCount; i++)
	{
		if(Math.abs(player.position[0] - enemies[i].position[0])<tileW/4 && Math.abs(player.position[1] - enemies[i].position[1])<tileH/4)
		{
			death.play();
			alert("ouch! Beware the green meanies!!!");
			lives--;
			reset();
			if(lives==0)
			{
				alert("GAME OVER... you collected "+points+" coins... was it worth it?");
				points=0;
				lives=3;
				level=1;
				reset();
				for(var q=0; q<enemyCount; q++){
					golds[q].position[0] = enemies[q].position[0];
				}	
			}
		}
		if(Math.abs(player.position[0] - golds[i].position[0])<tileW/2 && Math.abs(player.position[1] - golds[i].position[1])<tileH/2)
		{
			points+=1;
			pickup.play();
			golds[i].position[0]=-100;
		}
		if(golds[i].position[0]==-100){
			remainingGold -= 1;
		}
	}
	if(remainingGold == 0)
	{
		level++;
		lives++;
		reset();
		for(var k=0; k<enemyCount; k++)
		{
			golds[k].position[0] = enemies[k].position[0];
		}
	}
}

function enemyLogic(enemy,t)
{
	var move = [0,0];
	var x=0, y=0;
	move = [0,0];
	x = 1-Math.floor(Math.random()*3);
	y = 1-Math.floor(Math.random()*3);
	if(Math.floor(Math.random()*2)==0){x=0;}else{y=0;}
	if(gameMap[toIndex(enemy.tileTo[0] +x, enemy.tileTo[1] +y)]==1)
	{ 
		enemy.trySetTo([x,y],t);
	}
}

function drawScoreboard()
{
	ctx.fillStyle = "#666666";
	ctx.fillRect(100,0,500,30);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("[ " + points+" ] x :)", 110, 20);
	ctx.fillText(" [ " + lives+ " ] x </3", 325, 20);
	ctx.fillText("lvl "+level, 550, 20);
}

function drawCharacters(currentFrameTime)
{
	
	// PROCESS PLAYER MOVEMENT:
	if(!player.processMovement(currentFrameTime))
	{	
		player.sx = 0;
		getInput();
		player.trySetTo(input,currentFrameTime);
	}else{player.sx+=1;}

	// PROCESS ENEMY MOVEMENTS:
	for(var k=0; k<enemyCount; k++){
		if(!enemies[k].processMovement(currentFrameTime))
		{
			if(currentFrameTime%50<25)
			{
				enemyLogic(enemies[k],currentFrameTime);
			}
		}
	}
	
	ctx.drawImage(document.getElementById("sprite"),(player.sx%3)*240,player.sy*300,250,250,player.position[0],player.position[1]-tileW/2,player.dimensions[0],player.dimensions[1]);
	for(var i=0; i<enemyCount; i++)
	{
		ctx.drawImage(document.getElementById("monster"),0,0,500,500,enemies[i].position[0],enemies[i].position[1]-tileW/2,enemies[i].dimensions[0],enemies[i].dimensions[1]);
	}
	// MAKE COINS BLINK:
	if((Math.floor(currentFrameTime/500))%2==0){
		for(var i=0; i<enemyCount; i++)
		{
			ctx.drawImage(document.getElementById("gold"),0,0,2200,2200,golds[i].position[0]+tileW/2,golds[i].position[1],golds[i].dimensions[0]/2,golds[i].dimensions[1]/2);
		}
	}
}

function drawGame()
{
	if(ctx==null){ return; }

	var currentFrameTime = Date.now();
	var timeElapsed = currentFrameTime - lastFrameTime;
	var sec = Math.floor(Date.now()/1000);
	if(sec != currentSecond){
		currentSecond = sec;
		framesLastSecond = frameCount;
		frameCount = 1;
		fps = frameCount;
	}else{ frameCount++; }
	

	checkCollision();
	drawMap();
	drawScoreboard();
	drawCharacters(currentFrameTime);

	lastFrameTime = currentFrameTime;
	requestAnimationFrame(drawGame);
}