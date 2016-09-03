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
var layer1   = document.getElementById('layer1');
var ctx1  = layer1.getContext('2d');
var layer2   = document.getElementById('layer2');
var ctx2  = layer2.getContext('2d');

var lastMousePosX
var lastMousePosY
var radius = 40;
var currentColor = 'red'


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
  context.clearRect(0, 0, 1200, 800)
  context.beginPath();
  context.arc(x,y, radius/2, 0, 2 * Math.PI, false);
  context.lineWidth = 1;
  context.strokeStyle = '#333';
  context.stroke();
}

document.getElementById('canvasContain').addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(layer1, evt);
  statsEl.innerHTML = mousePos.x + ',' + mousePos.y;

  if (evt.which == 1) {
    ctx2.clearRect(0, 0, 1200, 800)
    drawShape(mousePos.x, mousePos.y, ctx1)
  } else {
    drawBrush(mousePos.x, mousePos.y, ctx2)
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
  ctx1.clearRect(0,0,1200,800)
})

// Color Boxes
var boxes = document.getElementsByClassName('color-box')
for(i=0; i < boxes.length; i++) {
  var colorBox = boxes[i]
  colorBox.addEventListener('click', function(e) {
    currentColor = this.getAttribute('data-color')
    document.getElementById('currentColor').style.background = currentColor;
  })
}

function download() {
    var dt = layer1.toDataURL('image/jpeg');
    this.href = dt;
};
document.getElementById('save').addEventListener('click', download, false);
