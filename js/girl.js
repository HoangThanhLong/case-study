let girl = function(game, x, y){
	this.game = game;
	this.x    = x;
	this.y    = y;
	let self  = this;

	this.draw = function(){
		this.game.context.drawImage(
			this.game.resource.girl.img,
			x,
			y
		);
	}

};