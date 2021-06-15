import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  constructor() {
    this.w = 0;
    this.h = 0;
  }

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasTop', { read: ElementRef })
  canvasTop!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private ctxTop!: CanvasRenderingContext2D;
  private w: number;
  private h: number;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    let rect = canvas.parentElement!.getBoundingClientRect();
    this.w = rect.width;;
    this.h = rect.height;;
    canvas.style.width = this.w + "px";
    canvas.style.height = this.h + "px";
    canvas.width = this.w * devicePixelRatio;
    canvas.height = this.h * devicePixelRatio;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(devicePixelRatio, devicePixelRatio);

    const canvasTop = this.canvasTop.nativeElement;
    canvasTop.style.width = this.w + "px";
    canvasTop.style.height = this.h + "px";
    canvasTop.width = this.w * devicePixelRatio;
    canvasTop.height = this.h * devicePixelRatio;
    this.ctxTop = canvasTop.getContext('2d')!;
    this.ctxTop.scale(devicePixelRatio, devicePixelRatio);

    this.animate();
  }

  animate(): void {
    // this.ctx!.fillStyle = '#ddd';
    // this.ctx!.fillRect(0, 0, this.w, this.h);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(0, 0, 125, 125);
    // this.ctx.fillStyle = 'blue';
    // this.ctx.fillRect(0, 0, 125, 125);

    drawDiagonals(this.ctx, this.w, this.h)

    const t = turtle({
      x: this.w / 2,
      y: this.h / 2,
      w: this.w,
      h: this.h,
      angleInRadians: 0,
      penDown: false,
      penColor: "#000000",
      lineWidth: 1,
      ctx: this.ctx,
      ctxTop: this.ctxTop,
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
    t.forward(30);
  };
}

// TODO: add type annotation for turtle parameter
function turtle({
  x,
  y,
  w,
  h,
  angleInRadians,
  penDown,
  penColor,
  lineWidth,
  ctx,
  ctxTop,
}: any) {
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
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const backward = () => {
    forward(-length);
  };
  const turnleft = (angleInDegrees: number) => {
    angleInRadians = deg2rad((angleInDegrees + rad2deg(angleInRadians)) % 360);
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const turnright = (angleInDegrees: number) => {
    turnleft(-angleInDegrees);
  };
  const direction = (angleInDegrees: any) => {
    angleInRadians = 2 * Math.PI - deg2rad(angleInDegrees);
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const center = () => {
    x = w / 2;
    y = h / 2;
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const go = (x1: number, y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = w / 2 + x1;
    y = h / 2 + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const gox = (x1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = w / 2 + x1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
  };
  const goy = (y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    y = h / 2 + y1;
    penDown = penDownPrev;
    drawArrowhead(ctxTop, w, h, x, y, angleInRadians);
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
function drawArrowhead(ctx: CanvasRenderingContext2D, w: number, h: number, x: number, y: number, radians: number) {
  ctx.clearRect(0, 0, w, h);
  const height = 24;
  const width = 6;
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

function drawDiagonals(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(w, h);
  ctx.moveTo(w, 0);
  ctx.lineTo(0, h);
  ctx.stroke();
}
