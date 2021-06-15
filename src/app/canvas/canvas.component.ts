import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

console.log('devicePixelRatio :>> ', devicePixelRatio);

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  // constructor() { }

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasTop', { read: ElementRef })
  canvasTop!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private ctxTop!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    canvas.width = canvas.parentElement!.offsetWidth * devicePixelRatio;
    canvas.height = canvas.parentElement!.offsetHeight * devicePixelRatio;
    this.ctx = canvas.getContext('2d')!;
    // this.ctx!.scale(devicePixelRatio, devicePixelRatio);

    const canvasTop = this.canvasTop.nativeElement;
    canvasTop.width = canvasTop.parentElement!.offsetWidth * devicePixelRatio;
    canvasTop.height = canvasTop.parentElement!.offsetHeight * devicePixelRatio;
    this.ctxTop = canvasTop.getContext('2d')!;
    // this.ctxTop!.scale(devicePixelRatio, devicePixelRatio);

    this.animate();
  }

  animate(): void {
    const canvas = this.canvas!.nativeElement;
    const canvasTop = this.canvasTop!.nativeElement;

    // this.ctx!.fillStyle = '#ddd';
    // this.ctx!.fillRect(0, 0, canvas.width, canvas.height);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(0, 0, 125, 125);
    // this.ctx.fillStyle = 'blue';
    // this.ctx.fillRect(0, 0, 125, 125);

    const x = canvas.width / 2;// / devicePixelRatio;
    const y = canvas.height / 2;// / devicePixelRatio
    console.log('x :>> ', x);
    console.log('y :>> ', y);
    let rect = canvas.parentElement!.getBoundingClientRect();
    // const w = canvas.parentElement!.offsetWidth;
    // const h = canvas.parentElement!.offsetHeight;
    const w = rect.width;
    const h = rect.height;
    console.log('w :>> ', w);
    console.log('h :>> ', h);
    const w2 = canvas.width;
    console.log('w2 :>> ', w2);

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#eee';
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(w, h);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#eee';
    this.ctx.moveTo(w, 0);
    this.ctx.lineTo(0, h);
    this.ctx.stroke();

    const t = turtle({
      x: rect.width / 2,
      y: rect.height / 2,
      angleInRadians: 0,
      penDown: false,
      penColor: "#000000",
      lineWidth: 1,
      ctx: this.ctx,
      canvas,
      ctxTop: this.ctxTop,
      canvasTop,
    });

    t.penDown = true;
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
    t.pencolor("#ff0000");
    t.direction(90);
    t.forward(30);
    t.go(100, 100);
    t.forward(30);
    t.gox(30);
    t.goy(10);
  };
}

// TODO: add type annotation for turtle parameter
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
}: any) {
  // go forward and draw a line along the path if the pen is down
  const forward = (length: number) => {
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
  const turnleft = (angleInDegrees: number) => {
    angleInRadians = deg2rad((angleInDegrees + rad2deg(angleInRadians)) % 360);
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const turnright = (angleInDegrees: number) => {
    turnleft(-angleInDegrees);
  };
  const direction = (angleInDegrees: any) => {
    angleInRadians = 2 * Math.PI - deg2rad(angleInDegrees);
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const center = () => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2 / devicePixelRatio;
    y = canvas.height / 2 / devicePixelRatio;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const go = (x1: number, y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2 / devicePixelRatio + x1;
    y = canvas.height / 2 / devicePixelRatio + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const gox = (x1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = canvas.width / 2 / devicePixelRatio + x1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const goy = (y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    y = canvas.height / 2 / devicePixelRatio + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, canvasTop, x, y, angleInRadians);
  };
  const penwidth = (newLineWidth: number) => {
    lineWidth = newLineWidth;
  };
  const pencolor = (newPencolor: string) => {
    penColor = newPencolor;
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
    pencolor,
    set penDown(value: boolean) {
      penDown = value;
    },
    logStatus,
  };
}

// https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians/9705160#9705160
function deg2rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad: number) {
  return (rad * 180) / Math.PI;
}

// https://stackoverflow.com/questions/16135469/make-pointing-arrow-at-the-end-of-the-drawing-canvas/16137856#16137856
function drawArrowhead(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number, y: number, radians: number) {
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
