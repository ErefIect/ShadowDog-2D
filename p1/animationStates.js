// 创建对象数据
const spriteAnimations = [];

let  animationStates = [
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

export default animationStates;
export { spriteAnimations };

