"use strict";
$(document).ready(function(){
	console.log("document ready");
	//prevent right click menu
	$('body').on('contextmenu', '#myCanvas', function(e){ return false; });
	game.init();
});

console.log("finished loading js");