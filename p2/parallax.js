/**@type {HTMLCanvasElement}**/
let canvas = document.getElementById('canvas1');
// 创建 canvas 2D 对象
let ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 15;
 
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


// dom操作
const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerHTML = gameSpeed
slider.addEventListener('change', function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = e.target.value;
})

function Layer(image, speedModifier) {
  this.image = image;
  this.speedModifier = speedModifier;
  this.speed = gameSpeed * speedModifier;
  this.x = 0;
  this.y = 0;
  this.width = 2400;
  this.height = 800;
  this.x2 = this.width;
  this.update = function () {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x < -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 < -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
  
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  this.draw = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}




const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObject = [layer1, layer2, layer3, layer4, layer5];

// 主循环
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  gameObject.forEach((object, index) => {

    object.update();
    object.draw();

  })

  requestAnimationFrame(animate);
}
animate();





























