/** @type {HTMLCanvasElement} **/
//// 初始化canvas属性
const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');

CANVAS_HEIGHT = canvas.height = 600;
CANVAS_WIDTH = canvas.width = 800;

//// enemy对象数组
const numberOfEnemies = 10;
const enemiesArray = [];

//// 加载enemy图片资源
let enemyImage = new Image();
enemyImage.src = 'enemies/enemy1.png'

//// 游戏frame: 控制整体速度
let gameFrame = 0;


class Enemy {
  constructor() {
    //// enemy随机速度区间: [-1, 1]
    this.speed = Math.random() * 4 - 2;
    // this.speed = Math.random() * 2 - 1;
    // this.speed = -1;

    this.spriteWidth = [293, 266] ;
    this.spriteHeight = [155, 188];
    //// 缩放
    this.width = this.spriteWidth[1] / 2.5;     
    this.height = this.spriteHeight[1] / 2.5;
    
    //// 确保在canvas内部 随机位置生成 enemy
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.width);
    
    //// sprite 动画frame
    this.frame = 0;
    this.flatFrame = Math.floor(Math.random() * 3 + 1); //// 作为除数需要取整
  }
  update() {
    
    //// sprite animate state update
    if (gameFrame % 4 == 0) {
      //// 振幅 = 百分比 * 随机速度
      this.x += ( 4 / this.flatFrame ) * (Math.random() * 3 - 1.5);
      this.y += ( 4 / this.flatFrame ) * (Math.random() * 3 - 1.5);
    }
    // this.x += this.speed;
    // this.y += this.speed;

    //// 将移动速度, flat动画播放速度改为默认速度的[1, 4]倍
    if (gameFrame % this.flatFrame === 0) {
      this.frame <= 4 ? this.frame++ : this.frame = 0;
    }
  }
  draw() {

    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(enemyImage,
      this.frame * this.spriteWidth[0], 0,
      this.spriteWidth[0], this.spriteHeight[0],
      this.x, this.y, this.width, this.height);
  }
}

////  创建Enemy数组
function createEnemy(number) {
  for (let index = 0; index < number; index++) {
    let enemy = new Enemy();
    enemiesArray.push(enemy);
  }
}
createEnemy(numberOfEnemies);

////  游戏主循环
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach((Element) => {
    Element.draw();
    Element.update();
    // console.log(Element.x, Element.y);
  })

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
