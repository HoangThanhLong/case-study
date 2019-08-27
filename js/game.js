let game = function(){
	this.canvas         = null;
	this.context        = null;
	this.resource       = null;
	this.girl         = [];
	this.eggs           = [];
	this.bar            = null;
	this.bowl           = null;
	this.resourceLoaded = false; // cái này kiểm tra tất cả ảnh đã tải
	this.score          = 0;

	let self = this;

	this.init = function(){
		this.canvas        = document.createElement('canvas');
		this.canvas.width  = 450; // chiều rộng game
		this.canvas.height = 400; // chiều cao game
		this.context       = this.canvas.getContext('2d');

		document.body.appendChild(this.canvas);

		// tạo tất cả các object
		this.resource = new resource(this);
		this.bar      = new bar(this);
		this.resource.load();
		this.girl = [
			new girl(this, 50, 25),
			new girl(this, 150, 25),
			new girl(this, 250, 25),
			new girl(this, 350, 25),
		];

		this.bowl = new bowl(this);
		this.bowl.init();

		setInterval(self.createNewEgg, 1500);// tốc độ rơi quả trứng

	};

	this.start = function(){
		this.loop();
	};

	this.loop = function(){
		self.update();
		self.draw();
		setTimeout(self.loop, 10); // SL ra trứng trên khung hình /s
	};

	this.update = function(){
		this.updateAllEggs();
	};

	this.updateAllEggs = function(){
		for (let i = 0; i < this.eggs.length; i++){
			this.eggs[i].update();
		}
	};

	this.draw = function(){
		// hình nền
		self.context.fillStyle = "#E16DE3";
		self.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

		if (self.resourceLoaded == false){
			self.drawLoading();
		}
		else {
			self.drawTheWorld();
		}
	};

	// tạo trứng mới
	this.createNewEgg = function(){
		if (self.resourceLoaded){
			let newEgg = new egg(self);
			newEgg.init();
			self.eggs.push(newEgg); // cho vào mảng các chai bia
		}
	};

	this.drawTheWorld = function(){
		self.drawScore();
		self.bar.draw();
		self.bowl.draw();
		self.drawAllEggs();
		self.drawAllGirls();
	};

	this.drawAllEggs = function(){
		// lặp qua từng quả trứng
		for (let i = 0; i < this.eggs.length; i++){
			this.eggs[i].draw();
		}
	};

	// vẽ tất cả các con gà lên
	this.drawAllGirls = function(){
		for (let i = 0; i < this.girl.length; i++){
			this.girl[i].draw();
		}
	};

	//chữ loading
	this.drawLoading = function(){
		self.context.fillStyle = '#ffffff';
		self.context.font = '30px Arial';
		self.context.fillText('Loading...', 100, 100);
	};

	// vẽ điểm
	this.drawScore = function(){
		self.context.fillStyle = '#ffffff';
		self.context.font = '30px Arial';
		self.context.fillText('Score: ' + this.score, 150, 200);
	}

};