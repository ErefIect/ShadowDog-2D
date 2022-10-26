export default class Enemy {
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