const bigCanvas = document.getElementById('big-canvas');
const bigCtx = bigCanvas.getContext('2d');

class Star {
  constructor(centerX, centerY, color) {
    this._outerRadius = 70;
    this._innerRadius = 35;
    this._angles = 5;
    this._points = [];
    this._color = color;
    this._cx = centerX;
    this._cy = centerY;

    this.drawStar();
  }

  getColor() {
    return this._color;
  }

  getPoints() {
    return this._points;
  }

  drawStar() {
    let rot = (Math.PI / 2) * 3;
    let x = this._cx;
    let y = this._cy;
    const step = Math.PI / this._angles;

    bigCtx.beginPath();
    bigCtx.moveTo(this._cx, this._cy - this._outerRadius);
    this._points.push([this._cx, this._cy - this._outerRadius]);
    for (let i = 0; i < this._angles; i++) {
      x = this._cx + Math.cos(rot) * this._outerRadius;
      y = this._cy + Math.sin(rot) * this._outerRadius;
      bigCtx.lineTo(x, y);
      this._points.push([x, y]);
      rot += step;

      x = this._cx + Math.cos(rot) * this._innerRadius;
      y = this._cy + Math.sin(rot) * this._innerRadius;
      bigCtx.lineTo(x, y);
      this._points.push([x, y]);
      rot += step;
    }
    bigCtx.lineTo(this._cx, this._cy - this._outerRadius);
    this._points.push([this._cx, this._cy - this._outerRadius]);
    bigCtx.closePath();
    bigCtx.fillStyle = this._color;
    bigCtx.fill();
  }
}
