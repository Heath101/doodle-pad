function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

window.requestAnimFrame = (function(callback) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var statsEl = document.getElementById('stats');

var canvas = document.getElementById('drawingArea');
var context = canvas.getContext('2d');
var radius = 70;


function drawShape(x, y, context) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = '#003300';
  context.stroke();
}



canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  statsEl.innerHTML = mousePos.x + ',' + mousePos.y;
  drawShape(mousePos.x, mousePos.y, context)
}, false);