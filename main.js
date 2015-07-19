function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

var statsEl = document.getElementById('stats');

var canvas = document.getElementById('drawingArea');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'green';
context.fill();
context.lineWidth = 5;
context.strokeStyle = '#003300';
context.stroke();

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  statsEl.innerHTML = mousePos.x + ',' + mousePos.y;
}, false);