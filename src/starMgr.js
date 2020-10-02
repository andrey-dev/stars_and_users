'use strict';

const smallCanvas = document.getElementById('small-canvas');
const smallCtx = smallCanvas.getContext('2d');
const colors = ['red', 'blue', 'green', 'yellow', 'black'];

class StarManager {
  constructor() {
    this._borderWidth = 1;
    this._centerX = 75;
    this._centerY = 75;
    this._starWidth = 150;
    this._canvasWidth = bigCanvas.getBoundingClientRect().width - this._borderWidth * 2;
    this._rowCount = Math.floor(this._canvasWidth / this._starWidth);
    this._stars = new Map();
  }

  init() {
    this.drawStars();
    this.startClickListener();
  }

  startClickListener() {
    document.addEventListener('click', (point) => {
      this.clickHandler(point);
    });
  }

  clickHandler(point) {
    let newColor = 'white';
    for (const [key, value] of this._stars) {
      const points = value.getPoints();
      const xPoints = points.map((pointsArr) => pointsArr[0]);
      const yPoints = points.map((pointsArr) => pointsArr[1]);
      const clickPoint = { x: point.layerX, y: point.layerY };
      if (this.isClickInside(clickPoint, xPoints, yPoints)) {
        newColor = key;
        break;
      }
    }
    smallCtx.fillStyle = newColor;
    smallCtx.fillRect(0, 0, smallCanvas.width, smallCanvas.height);
  }

  drawStars() {
    const centerCoords = this.initStarCenterCoords();
    colors.forEach((color, idx) => {
      this._stars.set(color, new Star(...centerCoords[idx], color));
    });
  }

  initStarCenterCoords() {
    const coordsCount = Math.ceil(colors.length / this._rowCount);
    const coordsMatrix = Array(coordsCount).fill(Array(this._rowCount));
    const coords = [];
    for (let i = 0; i < coordsMatrix.length; i++) {
      for (let j = 0; j < coordsMatrix[i].length; j++) {
        // If we have enough coords - return
        if (coords.length === colors.length) {
          return coords;
        }
        coords.push([this._centerX + i * this._starWidth, this._centerY + j * this._starWidth]);
      }
    }
    return coords;
  }

  isClickInside(clickPoint, xPoints, yPoints) {
    const x = clickPoint.x;
    const y = clickPoint.y;
    const xp = xPoints;
    const yp = yPoints;

    let j = xp.length - 1;
    let count = 0;
    for (let i = 0; i < xp.length; i++) {
      if (
        ((yp[i] <= y && y < yp[j]) || (yp[j] <= y && y < yp[i])) &&
        x > ((xp[j] - xp[i]) * (y - yp[i])) / (yp[j] - yp[i]) + xp[i]
      ) {
        count = !count;
      }
      j = i;
    }
    return !!(count % 2);
  }
}

const stars = new StarManager();
stars.init();
