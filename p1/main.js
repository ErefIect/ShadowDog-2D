import animationStates, { spriteAnimations } from './animationStates.js';
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'img/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

// 监听事件
let playerState = 'run';
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function (e) {
  playerState = e.target.value;
});

let gameFrame = 0;
const staggerFrame = 5;


animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };
  let positionY = index * spriteHeight;
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
  // 清除指定区域
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth / 2, spriteHeight / 2);
  
  gameFrame++;
 
  // 动画循环
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
