let gameImage = function (name) {
	this.img = null;
	this.name = name;
	this.loaded = false; // trạng thái load ảnh
	let self = this;

	this.load = function () {
		this.img = new Image();
		this.img.onload = function () {
			self.loaded = true;
		};
		this.img.src = 'images/' + name + '.png';
	}
};

let resource = function (game) {
	this.game = game;
	this.bar = new gameImage('bar'); // là cái thanh cho gà đậu
	this.bowl = new gameImage('bowl'); // là cái bát hứng trứng
	this.girl = new gameImage('girl');
	this.egg1 = new gameImage('egg1'); // có 2 loại trứng
	this.egg2 = new gameImage('egg2'); // có 2 loại trứng
	this.egg_popped = new gameImage('egg-popped');
	this.shit = new gameImage('shit');

	let self = this;

	// load tất cả hình ảnh
	this.load = function () {
		this.bar.load();
		this.bowl.load();
		this.girl.load();
		this.egg1.load();
		this.egg2.load();
		this.egg_popped.load();
		this.shit.load();

		setInterval(function () {
			self.checkAllImageLoaded();
		}, 500)
	};

	this.checkAllImageLoaded = function () {
		// tất cả ảnh đã load xong
		if (
			(this.bar.loaded) &&
			(this.bowl.loaded) &&
			(this.girl.loaded) &&
			(this.egg1.loaded) &&
			(this.egg2.loaded) &&
			(this.egg_popped.loaded) &&
			(this.shit.loaded)
		) {
			this.game.resourceLoaded = true;
		}
	}
};