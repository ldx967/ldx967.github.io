var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 设置游戏参数
var player = {
	x: 280,
	y: 350,
	width: 40,
	height: 40,
	speed: 5,
	score: 0,
	hp: 3
};
var bullets = [];
var enemies = [];
var enemyTimer = 0;
var enemySpeed = 3;
var enemyFrequency = 100;
var gameOver = false;

// 绘制游戏元素
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawPlayer();
	drawBullets();
	drawEnemies();
	drawScore();
	drawHP();
	if (gameOver) {
		drawGameOver();
	}
}

function drawPlayer() {
	ctx.fillStyle = "blue";
	ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
	ctx.fillStyle = "red";
	for (var i = 0; i < bullets.length; i++) {
		ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
	}
}

function drawEnemies() {
	ctx.fillStyle = "green";
	for (var i = 0; i < enemies.length; i++) {
		ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
	}
}

function drawScore() {
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.fillText("Score: " + player.score, 10, 25);
}

function drawHP() {
	ctx.fillStyle = "black";
	ctx.font = "20px Arial";
	ctx.fillText("HP: " + player.hp, 10, 50);
}

function drawGameOver() {
	ctx.fillStyle = "red";
	ctx.font = "50px Arial";
	ctx.fillText("Game Over", canvas.width / 2 - 150, canvas.height / 2);
}

// 更新游戏状态
function update() {
	updateBullets();
	updateEnemies();
	checkCollision();
	checkGameOver();
}

function updateBullets() {
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].y -= bullets[i].speed;
		if (bullets[i].y < 0) {
			bullets.splice(i, 1);
			i--;
		}
	}
}

function updateEnemies() {
	enemyTimer++;
	if (enemyTimer % enemyFrequency === 0) {
		var enemy = {
			x: Math.random() * (canvas.width - 40),
			y: -40,
			width: 40,
			height: 40,
			speed: enemySpeed
		};
		enemies.push(enemy);
	}
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].y += enemies[i].speed;
		if
        (enemies[i].y > canvas.height) {
            enemies.splice(i, 1);
            i--;
        }
    }
}

function checkCollision() {
for (var i = 0; i < bullets.length; i++) {
for (var j = 0; j < enemies.length; j++) {
if (bullets[i].x < enemies[j].x + enemies[j].width &&
bullets[i].x + bullets[i].width > enemies[j].x &&
bullets[i].y < enemies[j].y + enemies[j].height &&
bullets[i].y + bullets[i].height > enemies[j].y) {
bullets.splice(i, 1);
i--;
enemies.splice(j, 1);
j--;
player.score++;
enemySpeed += 0.2;
enemyFrequency -= 2;
if (enemyFrequency < 20) {
enemyFrequency = 20;
}
}
}
}
for (var i = 0; i < enemies.length; i++) {
if (player.x < enemies[i].x + enemies[i].width &&
player.x + player.width > enemies[i].x &&
player.y < enemies[i].y + enemies[i].height &&
player.y + player.height > enemies[i].y) {
enemies.splice(i, 1);
i--;
player.hp--;
if (player.hp === 0) {
gameOver = true;
}
}
}
}

function checkGameOver() {
if (gameOver) {
bullets = [];
enemies = [];
}
}

// 处理用户输入
document.addEventListener("keydown", function(event) {
if (event.keyCode === 37) { // Left
player.x -= player.speed;
if (player.x < 0) {
player.x = 0;
}
} else if (event.keyCode === 39) { // Right
player.x += player.speed;
if (player.x + player.width > canvas.width) {
player.x = canvas.width - player.width;
}
} else if (event.keyCode === 32) { // Space
var bullet = {
x: player.x + player.width / 2 - 5,
y: player.y - 10,
width: 10,
height: 10,
speed: 10
};
bullets.push(bullet);
}
});

// 游戏循环
function gameLoop() {
draw();
update();
if (!gameOver) {
requestAnimationFrame(gameLoop);
}
}

gameLoop();