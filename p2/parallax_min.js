let canvas = document.getElementById('canvas1');
// 创建 canvas 2D 对象
let ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 15;
// 创建layer对象
let backgroundLayer1 = new Image();
backgroundLayer1.src = ('img/layer-1.png');
let backgroundLayer2 = new Image(); 
backgroundLayer2.src = ('img/layer-2.png');
let backgroundLayer3 = new Image();
backgroundLayer3.src = ('img/layer-3.png');
let backgroundLayer4 = new Image();
backgroundLayer4.src = ('img/layer-4.png');
let backgroundLayer5 = new Image();
backgroundLayer5.src = ('img/layer-5.png');



  function move_bcg(bcg, bcg_speed) {
 
    (function () {
      ctx.drawImage(bcg, x, 0);
      ctx.drawImage(bcg, x2, 0);
      if (x < -2400) x = x2 + 2400 - bcg_speed;
      else x -= bcg_speed;
      if (x2 < -2400) x2 = x + 2400 - bcg_speed;
      else x2 -= bcg_speed;
    })();
  }


console.log(backgroundLayer1);
let x = 0;
let x2 = 2400;  
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
 


  move_bcg(backgroundLayer1, 1);
  move_bcg(backgroundLayer2, 1);
  move_bcg(backgroundLayer3, 1);
  move_bcg(backgroundLayer4, 1);
  move_bcg(backgroundLayer5, 1);
requestAnimationFrame(animate);
}
animate();






























