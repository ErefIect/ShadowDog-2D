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

