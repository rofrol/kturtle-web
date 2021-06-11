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

  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();

  drawArrowhead(ctx, 75, 150, 90);

  const t = turtle(ctx);
  t.turnleft(90);
  console.log(t.angle());
  t.turnright(10);
  console.log(t.angle());
};

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

function turtle(ctx) {
  let angle = 0; // up, degrees

  return {
    // go forward and draw a line along the path if the pen is down
    forward: () => {},
    // go backward and draw a line along the path if the pen is down
    backward: () => {},
    // turn left by D degrees
    turnleft: (d) => {
      angle = (angle + d) % 360;
    },
    // turn right by D degrees
    turnright: (d) => {
      angle = (angle - d) % 360;
    },
    angle: () => angle,
  };
}
// https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians/9705160#9705160
function deg2rad(degrees) {
  return (degrees * Math.PI) / 180;
}
