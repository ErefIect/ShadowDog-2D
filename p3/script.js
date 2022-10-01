/** @type {HTMLCanvasElement} **/
//// 初始化canvas属性
const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');

CANVAS_HEIGHT = ctx.height = 500;
CANVAS_WIDTH = ctx.width = 1000;

//// enemy对象数组
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
    this.width = this.spriteWidth[1] / 5;     
    this.height = this.spriteHeight[1] / 5;
    
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
    this.x += this.speed;
    this.y += this.speed;

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
createEnemy(100)

// console.log(enemiesArray);

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

/* 
sx 可选
// 需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 X 轴坐标。可以使用 3 参数或 5 参数语法来省略这个参数。

sy 可选
// 需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 Y 轴坐标。可以使用 3 参数或 5 参数语法来省略这个参数。

sWidth 可选
// 需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的 sx 和 sy 开始，到 image 的右下角结束。可以使用 3 参数或 5 参数语法来省略这个参数。使用负值将翻转这个图像。

sHeight 可选
// 需要绘制到目标上下文中的，image的矩形（裁剪）选择框的高度。使用负值将翻转这个图像。

dx
// image 的左上角在目标画布上 X 轴坐标。

dy
// image 的左上角在目标画布上 Y 轴坐标。

dWidth
// image 在目标画布上绘制的宽度。允许对绘制的 image 进行缩放。如果不说明，在绘制时 image 宽度不会缩放。注意，这个参数不包含在 3 参数语法中。

dHeight
// image 在目标画布上绘制的高度。允许对绘制的 image 进行缩放。如果不说明，在绘制时 image 高度不会缩放。注意，这个参数不包含在 3 参数语法中。
*/
