"use strict";
function Unit(id,x,y){
	this.id=id;
    this.x=x;
    this.y=y;
    this.selected=false;
    this.type=-1;

	game.increaseUnitCount();
};

Unit.prototype.update = function(){
	this.x+=1;
	if(this.x>1080)
		this.x=-20;

	/*if(Math.random()<0.1)
		this.y-=1;
	if(Math.random()<0.1)
		this.y+=1;*/
}
Unit.prototype.draw = function(ctx){
	ctx.fillStyle  = "white";
	ctx.fillRect(this.x,this.y,20,20);
}


