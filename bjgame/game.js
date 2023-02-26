// 定义游戏对象
var game = {
    width: 480,
    height: 360,
    ctx: null,
    platforms: [],
    player: null,
    gravity: 0.1,
    velocity: 0,
    jumpForce: 5,
    score: 0,
    init: function() {
        // 创建画布
        var canvas = document.getElementById("gameCanvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.ctx = canvas.getContext("2d");

        // 创建平台
        this.platforms.push(new Platform(0, 300, 480, 60));
        this.platforms.push(new Platform(100, 200, 100, 20));
        this.platforms.push(new Platform(300, 150, 100, 20));

        // 创建玩家
        this.player = new Player(50, 200, 20, 20);
    },
    update: function() {
        // 更新玩家状态
        this.player.y += this.velocity;
        this.velocity += this.gravity;
        if (this.player.y > this.height) {
            this.reset();
        }

        // 检查玩家与平台的碰撞
        for (var i = 0; i < this.platforms.length; i++) {
            var p = this.platforms[i];
            if (this.player.x + this.player.width > p.x && this.player.x < p.x + p.width) {
                if (this.player.y + this.player.height > p.y && this.player.y < p.y + p.height) {
                    this.velocity = 0;
                    this.player.y = p.y - this.player.height;
                    if (!p.isJumped) {
                        this.score++;
                        p.isJumped = true;
                    }
                }
            }
        }
    },
    draw: function() {
        // 绘制背景和分数
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = "#000000";
        this.ctx.fillText("Score: " + this.score, 10, 20);

        // 绘制平台和玩家
        for (var i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw(this.ctx);
        }
        this.player.draw(this.ctx);
    },
    reset: function() {
        // 重置游戏状态
        this.score = 0;
        this.velocity = 0;
        this.player.x = 50;
        this.player.y = 200;
        for (var i = 0; i <
            this.platforms.length; i++) {
                this.platforms[i].isJumped = false;
            }
        },
        jump: function() {
            // 处理玩家跳跃事件
            if (this.velocity == 0) {
                this.velocity -= this.jumpForce;
            }
        }
    };

    // 定义平台对象
    function Platform(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#FF0000";
    this.isJumped = false;
    }
    
    Platform.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // 定义玩家对象
    function Player(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "#0000FF";
    }
    
    Player.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // 处理键盘事件
    document.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
    game.jump();
    }
    });
    
    // 初始化游戏
    game.init();
    
    // 循环更新和绘制游戏
    setInterval(function() {
    game.update();
    game.draw();
    }, 1000 / 60);        