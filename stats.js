"use strict";
var stats = (function (){
	var MAXSAMPLES=20;
	var updates =[],
	updateCount=0,
	draws = [],
	drawCount=0,
	ups=-1,
	fps=-1;

	return{
		logUpdate:function(){
			updates[updateCount%MAXSAMPLES]=(new Date).getTime();
			ups=1000*(MAXSAMPLES-1)/(updates[updateCount%MAXSAMPLES]-updates[(updateCount+1)%MAXSAMPLES]);
			updateCount++;
		},
		logDraw:function(){
			draws[drawCount%MAXSAMPLES]=(new Date).getTime();
			fps=1000*(MAXSAMPLES-1)/(draws[drawCount%MAXSAMPLES]-draws[(drawCount+1)%MAXSAMPLES]);
			drawCount++;
		},
		draw:function(ctx){
			ctx.fillStyle = "white";
			ctx.textAlign="left";
			ctx.font="12px Courier New";
			ctx.fillText("UPS:"+ups.toFixed(2),0,10);
			ctx.fillText("FPS:"+fps.toFixed(2),0,22);
		}
	}

})();