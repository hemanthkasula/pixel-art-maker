const canvasContainer = document.getElementById('canvas-container');
const gridSizeInput = document.getElementById('grid-size');
const gridSizeValue = document.getElementById('grid-size-value');
const gridSizeValue2 = document.getElementById('grid-size-value2');
const colorPicker = document.getElementById('color-picker');
const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');

let gridSize = parseInt(gridSizeInput.value);
let drawing = false;
let color = colorPicker.value;

function createCanvas(size) {
  canvasContainer.innerHTML = '';
  canvasContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  canvasContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.addEventListener('mousedown', () => {
      drawing = true;
      pixel.style.background = color;
    });
    pixel.addEventListener('mouseover', () => {
      if (drawing) pixel.style.background = color;
    });
    pixel.addEventListener('touchstart', (e) => {
      e.preventDefault();
      pixel.style.background = color;
    });
    pixel.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elem && elem.classList.contains('pixel')) {
        elem.style.background = color;
      }
    });
    canvasContainer.appendChild(pixel);
  }
}
document.body.addEventListener('mouseup', () => drawing = false);
canvasContainer.addEventListener('mouseleave', () => drawing = false);

gridSizeInput.addEventListener('input', () => {
  gridSize = parseInt(gridSizeInput.value);
  gridSizeValue.textContent = gridSize;
  gridSizeValue2.textContent = gridSize;
  createCanvas(gridSize);
});
colorPicker.addEventListener('input', () => color = colorPicker.value);
resetBtn.addEventListener('click', () => createCanvas(gridSize));

// Download as PNG
downloadBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = gridSize;
  canvas.height = gridSize;
  const ctx = canvas.getContext('2d');
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel, i) => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    ctx.fillStyle = pixel.style.background || '#fff';
    ctx.fillRect(x, y, 1, 1);
  });
  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = canvas.toDataURL();
  link.click();
});

createCanvas(gridSize);
