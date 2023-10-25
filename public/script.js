const socket = io();

const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');

let drawing = false;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

function startDrawing(e) {
  drawing = true;
  draw(e);
}

function stopDrawing() {
  drawing = false;
  context.beginPath();
}

function draw(e) {
  if (!drawing) return;

  context.lineWidth = 2;
  context.lineCap = 'round';
  context.strokeStyle = '#000';

  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.stroke();

  const data = {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
  };

  socket.emit('draw', data);
}

socket.on('draw', (data) => {
  context.lineTo(data.x, data.y);
  context.stroke();
});
