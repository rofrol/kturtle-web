window.onload = function () {
  let canvas = document.getElementById("canvasBottom"),
    ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let canvasTop = document.getElementById("canvasTop"),
    ctxTop = canvasTop.getContext("2d");
  canvasTop.width = window.innerWidth;
  canvasTop.height = window.innerHeight;

  const t = turtle({
    x: canvas.width / 2,
    y: canvas.height / 2,
    angleInRadians: 0,
    penDown: false,
    penColor: "#000000",
    lineWidth: 1,
    ctx,
    canvas,
    ctxTop,
    canvasTop,
  });

  // t.turnleft(90);
  t.penDown = true;
  // t.turnright(90);
  t.turnright(45);
  t.forward(60);
  t.turnright(10);
  t.forward(30);
  t.turnright(10);
  t.forward(30);
  t.turnright(10);
  t.forward(30);
  t.turnright(10);
  t.forward(30);
  t.direction(90);
  t.forward(30);
  t.direction(180);
  t.forward(30);
  t.direction(45);
  t.forward(30);
  t.center();
  t.penwidth(2);
  t.direction(90);
  t.forward(30);
  t.go(100, 100);
  t.forward(30);
  t.gox(30);
  t.goy(10);
};

function turtle({
  x,
  y,
  angleInRadians,
  penDown,
  penColor,
  lineWidth,
  ctx,
  canvas,
  ctxTop,
  canvasTop,
}) {
  // go forward and draw a line along the path if the pen is down
  const forward = (length) => {
    var x0 = x,
      y0 = y;
    x -= length * Math.sin(angleInRadians);
    y -= length * Math.cos(angleInRadians);
    if (ctx) {
      if (penDown) {
        logStatus();
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = penColor;
        ctx.moveTo(x0, y0);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    } else {
      ctx.moveTo(x, y);
    }
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const backward = () => {
    forward(-length);
  };
  const turnleft = (angleInDegrees) => {
    angleInRadians = deg2rad((angleInDegrees + rad2deg(angleInRadians)) % 360);
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const turnright = (angleInDegrees) => {
    turnleft(-angleInDegrees);
  };
  const direction = (angleInDegrees) => {
    angleInRadians = 2 * Math.PI - deg2rad(angleInDegrees);
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const center = () => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2;
    y = canvas.height / 2;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const go = (x1, y1) => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2 + x1;
    y = canvas.height / 2 + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const gox = (x1) => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2 + x1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const goy = (y1) => {
    const penDownPrev = penDown;
    penDown = false;
    y = canvas.height / 2 + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const penwidth = (newLineWidth) => {
    lineWidth = newLineWidth;
  };
  const logStatus = () =>
    console.log(
      `"x = ${x}; y = ${y}; angleInRadians = ${angleInRadians}; angleInDegrees = ${rad2deg(
        angleInRadians
      )}; penDown = ${penDown}`
    );

  return {
    forward,
    backward,
    turnleft,
    turnright,
    direction,
    center,
    go,
    gox,
    goy,
    penwidth,
    set penDown(value) {
      penDown = value;
    },
    logStatus,
  };
}

// https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians/9705160#9705160
function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad) {
  return (rad * 180) / Math.PI;
}

// https://stackoverflow.com/questions/16135469/make-pointing-arrow-at-the-end-of-the-drawing-canvas/16137856#16137856
function drawArrowhead(ctx, canvas, x, y, radians) {
  const height = 24;
  const width = 6;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.beginPath();
  const x1 = (height / 2) * Math.sin(radians);
  const y1 = (height / 2) * Math.cos(radians);
  ctx.translate(x - x1, y - y1);
  ctx.rotate(-radians);
  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(-width, height);
  ctx.closePath();
  ctx.restore();
  ctx.strokeStyle = "#00ff00";
  ctx.lineWidth = 1;
  ctx.stroke();
  // ctx.fillStyle = "#00ff00";
  // ctx.fill();
}
