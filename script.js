
//html constants
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const r = document.querySelector('#r');
const r_out = document.querySelector('#r_out');
const g = document.querySelector('#g');
const g_out = document.querySelector('#g_out');
const b = document.querySelector('#b');
const b_out = document.querySelector('#b_out');

const strokeWidth = document.querySelector('#strokeWidth');
const strokeOut = document.querySelector('#strokeOut');
const container = document.querySelector(".container");
const containerTopMargin = 15;
const containerBottomMargin = 15;
const canvasBorderTop = 1;
const canvasBorderBottom = 1;

//this constant offsets the difference between the document height and body height
//this ensures that the whole page will be viewable without scrolling
const windowHeightOffset = 6;

//left click mouse button
const leftMouseClick = 0;

var hex="#000000";

window.addEventListener("load", () => {

  //resizing
  resizeCanvas();

  var painting = false;

  function startPosition(event) {
    //detects if the event was caused by a left mouse click
    if (event.button === leftMouseClick) {
      painting = true;
      draw(event);
    }
  }

  function finishedPosition() {
    painting = false;
    //finishes the draw path
    ctx.beginPath();
  }


  function draw(event) {

    //checks if the drawing has started by pressing the left mouse button
    if (!painting) return;

    ctx.lineWidth = strokeWidth.value;
    ctx.lineCap = "round";

    //sets the stroke color to the selected color
    ctx.strokeStyle = hex;

    var yOffset = getYOffset();

    //draws the line
    ctx.lineTo(event.clientX, event.clientY - yOffset);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY - yOffset);
  }

  //Canvas eventListeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", finishedPosition);
  canvas.addEventListener("mousemove", draw);

});

//slider change event listeners
r.addEventListener("change",setColor);
g.addEventListener("change",setColor);
b.addEventListener("change",setColor);


//gets current y offset of the canvas element
function getYOffset() {
  return container.offsetHeight + containerBottomMargin + containerTopMargin + canvasBorderTop + canvasBorderBottom;
}

//returns the colors set by the sliders in a hexadecimal string format
function setColor() {
  var r_hex = parseInt(r.value, 10).toString(16);
  var g_hex = parseInt(g.value, 10).toString(16);
  var b_hex = parseInt(b.value, 10).toString(16);


  //updates the sliders output colors
  r_out.style.backgroundColor="#"+r_hex+"0000";
  r_out.value=r.value;
  g_out.style.backgroundColor="#00"+g_hex+"00";
  g_out.value=g.value;
  b_out.style.backgroundColor="#0000"+b_hex;
  b_out.value=b.value;

  hex = "#" + pad(r_hex) + pad(g_hex) + pad(b_hex);
  strokeOut.style.backgroundColor=hex;
}

//auxiliary function for setColor that converts length 1 strings to double digit format
function pad(str) {
  return (str.length < 2) ? "0" + str : str;
}

function resizeCanvas() {

  var yOffset = getYOffset();

  //creates a temporary canvas and canvas context with new dimensions
  var tempCanvas = document.createElement("canvas");
  var tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = window.innerWidth;
  tempCanvas.height = window.innerHeight - yOffset - windowHeightOffset;

  //copies the current canvas to the temporary canvas
  tempCtx.drawImage(canvas, 0, 0);

  //resizes current canvas
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - yOffset - windowHeightOffset;

  //copies the temporary canvas to the now resized current canvas
  ctx.drawImage(tempCanvas, 0, 0);
}

//dynamic resizing
window.addEventListener("resize", resizeCanvas);
