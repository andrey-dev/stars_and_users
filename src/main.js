'use strict';

const canvasMenuEl = document.getElementById('canvas');
const tableMenuEl = document.getElementById('table');

const tableBlock = document.getElementsByClassName('table-block')[0];
const canvasBlock = document.getElementsByClassName('canvas-block')[0];

canvasMenuEl.addEventListener('click', () => {
  canvasBlock.style.display = 'flex';
  tableBlock.style.display = 'none';
});

tableMenuEl.addEventListener('click', () => {
  canvasBlock.style.display = 'none';
  tableBlock.style.display = 'block';
});
