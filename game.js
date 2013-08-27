"use strict";
var game = (function () {
    var width = null;
    var height = null;
    var canvas = null;
    var ctx = null;

    var unitCount=0;
    var unitArray=[];

	var gamestatus="menu";

	var UPS=25;
	var MAX_FPS=125;
	var nextUpdateTime=null;
	var nextDrawTime=null;

	//update priority at 25 UPS
	//draw max 125 FPS
	//if behind on updates, skip drawing
	function loop(){
		//update while due (after nextUpdateTime)
		//if it got behind, may need multiple updates here
		var cycles=0;
		while((new Date).getTime()>nextUpdateTime){
			update();
			cycles++;
			nextUpdateTime+=1000/UPS;
		}
		if(cycles>1)
			console.log(cycles + " updates bunched");

		//draw if due (only once)
		//if machine is faster, will limit at 125 fps
		//if machine is slower, will draw everytime gameloop is called
		if((new Date).getTime()>nextDrawTime){
			draw();
			nextDrawTime=(new Date).getTime()+1000/MAX_FPS;
			//nextDrawTime+=1000/MAX_FPS;
		}
	}

	function draw(){
		stats.logDraw();
		if(gamestatus=="menu")
			menu.draw(ctx);
		else if(gamestatus=="level1"){
			ctx.fillStyle  = "black";
			ctx.fillRect(0,0,1080,720);

			for(var i=0;i<unitCount;i++)
				unitArray[i].draw(ctx);
		}
		stats.draw(ctx);

	}

	function update(){
		stats.logUpdate();
		if(gamestatus=="level1")
			for(var i=0;i<unitCount;i++)
				unitArray[i].update();
	}

	//USER INPUT//
	function mouseDown(e){
		if(event.which == 1)//left 1 middle 2 right 3
			if(gamestatus=="menu")
				menu.mouseDown(e.offsetX,e.offsetY);
	}
	function mouseMove(e){
		if(gamestatus=="menu")
			menu.mouseMove(e.offsetX,e.offsetY);
	}
	function keyDown(e){
		console.log(e);
	}
	//USER INPUT END//

	return {
		updateGameStatus:function(s){
			gamestatus=s;
		},
		increaseUnitCount:function(){
			unitCount++;
		},
		init:function(){
			//reference canvas and context
			canvas=document.getElementById('myCanvas');//not jquery
			ctx=canvas.getContext("2d");
			width=canvas.width;
			height=canvas.height;

			//user input
			canvas.addEventListener('mousemove',mouseMove,false);
			canvas.addEventListener('mousedown',mouseDown,false);
			addEventListener('keydown',keyDown,false);

			//create objects??
			for(var i=0;i<1;i++)
				unitArray[i] = new Unit(i,Math.random()*(width+20)-20,Math.random()*(height+20)-20);

			//start off loop
			nextUpdateTime=(new Date).getTime();
			nextDrawTime=(new Date).getTime();
			setInterval(loop,1);

			console.log( "init()\twidth:"+width+", height:" + height);
		}
	};
})();
