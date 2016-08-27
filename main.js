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

var statsEl  = document.getElementById('stats');
var radiusEl = document.getElementById('radiusValue')
var canvas   = document.getElementById('drawingArea');
var context  = canvas.getContext('2d');

var lastMousePosX
var lastMousePosY
var radius = 40;
var currentColor = '#00aaff'


function drawShape(x, y, context) {
  context.beginPath();
  context.moveTo(lastMousePosX, lastMousePosY);
  context.lineTo(x, y);
  context.lineWidth = radius;
  context.strokeStyle = currentColor;
  context.lineCap = 'round';
  context.stroke();
}

function drawBrush(x, y, context) {
  // context.arc(x,y, radius, 0, 2 * Math.PI, false);
  // context.stroke();
}

canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  statsEl.innerHTML = mousePos.x + ',' + mousePos.y;

  if (evt.which == 1) {
    drawShape(mousePos.x, mousePos.y, context)
  } else {
    drawBrush(mousePos.x, mousePos.y, context)
  }

  lastMousePosX = mousePos.x
  lastMousePosY = mousePos.y

}, false);

// Size Adjust
document.getElementById('increaseRadius').addEventListener('click', function() {
  radius += 5
  radiusEl.innerHTML = radius
})
document.getElementById('decreaseRadius').addEventListener('click', function() {
  if (radius > 5) {
    radius -= 5
    radiusEl.innerHTML = radius
  }
})

// Clear screen
document.getElementById('clearScreen').addEventListener('click', function() {
  context.clearRect(0,0,1200,800)
})

// Color Boxes
var boxes = document.getElementsByClassName('color-box')
for(i=0; i < boxes.length; i++) {
  var colorBox = boxes[i]
  colorBox.addEventListener('click', function(e) {
    currentColor = this.getAttribute('data-color')
  })
}
