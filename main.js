/*
 * @Date: 2022-08-17 10:07:10
 */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'img/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

// 厨房幽灵#TODO 监听事件
let playerState = 'run';
const dropDown = document.getElementById('animations');
dropDown.addEventListener('change', function (e) {
  playerState = e.target.value;
});

let gameFrame = 0;
const staggerFrame = 5;
// 厨房幽灵#TODO 创建对象数据
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 8
  },
  {
    name: 'dizzy',
    frames: 10
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 6
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 7
  },
  {
    name: 'getHit',
    frames: 4
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };
  positionY = index * spriteHeight;
  for (let j = 0; j < state.frames; j++) {
    positionX = j * spriteWidth;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
  // 清除指定区域
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 参数 (url, source_x, s_y, s_width, s_height, distination_x, d_y, d_w, d_h)

  let position = Math.floor(gameFrame / staggerFrame) % spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  
  ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth / 2, spriteHeight / 2);
  
  gameFrame++;
  /* if (frameX < 9) {
    if (gameFrame % staggerFrame == 0) frameX += 1;
  } else {
    frameX = 0;
  }
  */
  
  // if (gameFrame < 10) gameFrame++;
  // else gameFrame = 0; 
  
  // console.log(gameFrame);
  // 厨房幽灵 #TODO动画循环
  requestAnimationFrame(animate);


}
animate();

