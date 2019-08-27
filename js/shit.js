let shit = function(game){
    this.game       = game;
    this.x          = 0;
    this.y          = 81;
    this.img        = null; // cái này chứa hình ảnh của chai bia, vì có 2 chai bia
    this.type       = 1; // loại chai bia, có 2 loại
    this.visible    = true;
    this.reduceScore = false; // kiểm tra chai bia này đã được tính điểm.

    let self = this;

    // khởi tạo chai bia
    this.init = function(){
        // loại chai bia ngẫu nhiên
        // this.type = this.getRandomInt(1); // loại bia 1 và 2
        if (this.type == 1){
            this.img = this.game.resource.shit.img;
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
        this.checkInBowl();
    };

    this.checkInBowl = function(){
        if (
            (this.x > this.game.bowl.x) &&
            (this.x < (this.game.bowl.x + this.game.resource.bowl.img.width)) &&
            (this.y >= 350)
        ){
            // ẩn chai bia đi
            this.visible = false;
            // cộng điểm
            if (this.reduceScore == false){
                this.game.score -= this.type;
                this.reduceScore = true;
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