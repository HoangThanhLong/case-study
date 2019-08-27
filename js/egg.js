let egg = function(game){
	this.game       = game;
	this.x          = 0;
	this.y          = 100;
	this.img        = null; // cái này chứa hình ảnh của trứng
	this.type       = 1; // loại quả trứng, có 2 loại
	this.popped     = false; // quả trứng đã vỡ chưa, nếu rơi xuống thì quả trứng vỡ
	this.visible    = true;
	this.addedScore = false; // kiểm tra trứng này đã được tính điểm.

	let self = this;

	// khởi tạo quả trứng
	this.init = function(){
		// loại quả trứng ngẫu nhiên
		this.type = this.getRandomInt(1, 2); // loại trứng 1 và 2
		// lấy hình ảnh quả trứng tương ứng
		if (this.type == 1){
			this.img = this.game.resource.egg1.img;
		}
		else {
			this.img = this.game.resource.egg2.img;
		}
		let positions = [78, 178, 278, 378];
		this.x = positions[this.getRandomInt(0, 3)];
	};

	this.getRandomInt = function(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	// tạo xong, mỗi lần lặp thì update
	this.update = function(){

		if (this.y <= 380){
			this.y += 2;
		}
		else {
			this.popped = true;
		}

		if (this.popped) {
			this.img = this.game.resource.egg_popped.img;
		}

		this.checkInBowl();
	};

	this.checkInBowl = function(){
		if (
			(this.x > this.game.bowl.x) &&
			(this.x < (this.game.bowl.x + this.game.resource.bowl.img.width)) &&
			(this.y >= 350)
		){
			// ẩn quả trứng đi
			this.visible = false;
			// cộng điểm
			if (this.addedScore === false){
				this.game.score += this.type;
				this.addedScore = true;
			}
		}
	};

	this.draw = function(){
		if (this.visible){
			this.game.context.drawImage(
				self.img,
				this.x - (this.img.width / 2), // ở giữa chiều ngang
				this.y
			);
		}
	}
};
