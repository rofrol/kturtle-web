window.onload = function () {
  let canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    width = (canvas.width = window.innerWidth),
    height = (canvas.height = window.innerHeight);

  // for (let i = 0; i < 100; i++) {
  //   ctx.beginPath();
  //   ctx.moveTo(Math.random() * width, Math.random() * height);
  //   ctx.lineTo(Math.random() * width, Math.random() * height);
  //   ctx.stroke();
  // }

  // ctx.beginPath();
  // ctx.moveTo(75, 50);
  // ctx.lineTo(100, 75);
  // ctx.lineTo(100, 25);
  // ctx.fill();

  drawArrowhead(ctx, 75, 150, 90);

  const t = turtle(ctx, {
    x: canvas.width / 2,
    y: canvas.height / 2,
    angleInRadians: 0,
    penDown: false,
    penColor: "#000000",
    lineWidth: 2,
  });

  t.turnleft(90);
  t.penDown = true;
  console.log(t.status());
  t.turnright(10);
  console.log(t.status());
  t.forward(100);
};

function turtle(ct, { x, y, angleInRadians, penDown, penColor, lineWidth }) {
  // go forward and draw a line along the path if the pen is down
  const forward = (length) => {
    // console.log('forward(' + length + ')');
    // console.log(status());
    var x0 = x,
      y0 = y;
    x += length * Math.sin(angleInRadians);
    y += length * Math.cos(angleInRadians);
    if (ct) {
      if (penDown) {
        // console.log(status());
        ct.beginPath();
        ct.lineWidth = lineWidth;
        ct.strokeStyle = penColor;
        ct.moveTo(x0, y0);
        ct.lineTo(x, y);
        ct.stroke();
      }
    } else {
      ct.moveTo(x, y);
    }
  };
  const backward = () => {
    forward(-length);
  };
  const turnleft = (angleInDegrees) => {
    angleInRadians = deg2rad((angleInDegrees + rad2deg(angleInRadians)) % 360);
  };
  const turnright = (angleInDegrees) => {
    turnleft(-angleInDegrees);
  };
  const status = () =>
    `"x = ${x}; y = ${y}; angleInRadians = ${angleInRadians}; angleInDegrees = ${rad2deg(
      angleInRadians
    )}; penDown = ${penDown}`;

  return {
    forward,
    backward,
    turnleft,
    turnright,
    status,
    set penDown(value) {
      penDown = value;
    },
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
function drawArrowhead(ctx, x, y, degrees) {
  const radians = deg2rad(degrees);
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 20);
  ctx.lineTo(-5, 20);
  ctx.closePath();
  ctx.restore();
  ctx.fill();
}
