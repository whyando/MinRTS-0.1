"use strict";
var menu = (function () {
	var b1Length;
	var inside=false;

	function newGame () {
		console.log("New Game!");
		game.updateGameStatus("level1");
		$('canvas').css('cursor', 'default');
	}

	function insideButton1(x,y){
		return x>=540-b1Length/2 &&
			y>=360-80-30 &&
			x<=540+b1Length/2 &&
			y<=360-80;
	}
	return {
		draw:function(ctx){
			//1080x720
			ctx.fillStyle  = "black";
			ctx.fillRect(0,0,1080,720);

			ctx.fillStyle = "white";
			ctx.textAlign="center";
			ctx.font="120px Courier New";
			ctx.fillText("MinRTS",540,360-170);

			ctx.fillStyle = inside ? "grey" : "white";

			ctx.font="45px Courier New";
			ctx.fillText("New Game",540,360-80);

			ctx.fillStyle = "white";
			ctx.fillText("Options",540,360-30);
			ctx.fillText("Exit",540,360+20);

			//ctx.strokeStyle="white";
			b1Length = ctx.measureText("New Game").width;
			//ctx.strokeRect(540-b1Length/2,360-80-45,b1Length,45);
		},
		mouseMove:function(x,y){
			if(insideButton1(x,y)){
				if(!inside){
					inside=true;
					$('canvas').css('cursor', 'pointer');
				}
			}
			else if(inside){
				inside=false;
				$('canvas').css('cursor', 'default');
			}
		},
		mouseDown:function(x,y){
			if(insideButton1(x,y)){
				newGame();
			}
		}
		//init:function(ctx){
		//
		//}
	}
})();
