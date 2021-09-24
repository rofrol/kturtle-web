import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  onExport() {
    const image = this.canvas.nativeElement.toDataURL("image/png");

    fetch('http://localhost:3000/save', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image": image,
      })
    });
  };

  constructor() {
    this.w = 0;
    this.h = 0;
  }

  @ViewChild('canvas', { read: ElementRef })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private w: number;
  private h: number;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const rect = canvas.parentElement!.getBoundingClientRect();
    this.w = rect.width;
    this.h = rect.height;
    setCanvas(canvas, this.ctx, this.w, this.h);
    drawDiagonals(this.ctx, this.w, this.h);

    // this.ctx!.fillStyle = '#ddd';
    // this.ctx!.fillRect(0, 0, this.w, this.h);
    // this.ctx.fillStyle = 'red';
    // this.ctx.fillRect(0, 0, 125, 125);
    // this.ctx.fillStyle = 'blue';
    // this.ctx.fillRect(0, 0, 125, 125);


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
    });

    // t.penDown = true;
    // t.turnright(45);
    // t.forward(60);
    // t.turnright(10);
    // t.forward(30);
    // t.turnright(10);
    // t.forward(30);
    // t.turnright(10);
    // t.forward(30);
    // t.turnright(10);
    // t.forward(30);
    // t.direction(90);
    // t.forward(30);
    // t.direction(180);
    // t.forward(30);
    // t.direction(45);
    // t.forward(30);
    // t.center();
    // t.penwidth(2);
    // t.pencolor("#ff0000");
    // t.direction(90);
    // t.forward(30);
    // t.go(100, 100);
    // t.forward(30);
    // t.gox(30);
    // t.goy(10);
    // t.forward(30);

    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    parseAndRun(t, searchBox.innerHTML)
    t.drawArrowhead()

    const typeahead = fromEvent(searchBox, 'input').pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
    );

    typeahead.subscribe(data => {
      parseAndRun(t, data);
    });
  }
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
}: any) {
  // ctx.lineCap = "round";
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
  };
  const backward = (length: number) => {
    forward(-length);
  };
  const turnleft = (angleInDegrees: number) => {
    angleInRadians = deg2rad((angleInDegrees + rad2deg(angleInRadians)) % 360);
  };
  const turnright = (angleInDegrees: number) => {
    turnleft(-angleInDegrees);
  };
  const direction = (angleInDegrees: any) => {
    angleInRadians = 2 * Math.PI - deg2rad(angleInDegrees);
  };
  const center = () => {
    x = w / 2;
    y = h / 2;
  };
  const go = (x1: number, y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = w / 2 + x1;
    y = h / 2 + y1;
    penDown = penDownPrev;
  };
  const gox = (x1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    x = w / 2 + x1;
    penDown = penDownPrev;
  };
  const goy = (y1: number) => {
    const penDownPrev = penDown;
    penDown = false;
    y = h / 2 + y1;
    penDown = penDownPrev;
  };
  const penwidth = (newLineWidth: number) => {
    lineWidth = newLineWidth;
  };
  const pencolor = (newPencolor: string) => {
    penColor = newPencolor;
  };
  const reset = () => {
    ctx.clearRect(0, 0, w, h);
    center();
    angleInRadians = 0;
    ctx.lineWidth = lineWidth;
  };
  const logStatus = () =>
    console.log(
      `"x = ${x}; y = ${y}; angleInRadians = ${angleInRadians}; angleInDegrees = ${rad2deg(
        angleInRadians
      )}; penDown = ${penDown}`
    );
  // https://stackoverflow.com/questions/16135469/make-pointing-arrow-at-the-end-of-the-drawing-canvas/16137856#16137856
  function drawArrowhead() {
    const height = 21;
    const width = 15;
    ctx.save();
    ctx.beginPath();
    var img = new Image();   // Create new img element
    img.src = 'assets/turtle.png'; // Set source path
    img.onload = function () {
      ctx.translate(x, y);
      ctx.rotate(-angleInRadians);
      ctx.drawImage(img, -width / 2, -height / 2, width, height);
      ctx.restore();
    };

  }
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
    reset,
    logStatus,
    drawArrowhead,
  };
}

// https://stackoverflow.com/questions/9705123/how-can-i-get-sin-cos-and-tan-to-use-degrees-instead-of-radians/9705160#9705160
function deg2rad(deg: number) {
  return (deg * Math.PI) / 180;
}

function rad2deg(rad: number) {
  return (rad * 180) / Math.PI;
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

// https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry/59143499#59143499
function setCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, w: number, h: number) {
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const scale = window.devicePixelRatio;
  canvas.width = w * scale;
  canvas.height = h * scale;
  ctx.scale(scale, scale);
}

function parseAndRun(t: any, data: string) {
  const commands = data.trim().split('\n');
  // console.log(`commands:\n${JSON.stringify(commands)}`);
  commands.map((str: string) => {
    const [cmd, val1, val2] = str.split(' ');
    switch (cmd) {
      case 'FORWARD':
        t.forward(parseInt(val1, 10));
        break;
      case 'BACKWARD':
        t.backward(parseInt(val1, 10));
        break;
      case 'TURNLEFT':
        t.turnleft(parseInt(val1, 10));
        break;
      case 'TURNRIGHT':
        t.turnright(parseInt(val1, 10));
        break;
      case 'DIRECTION':
        t.direction(parseInt(val1, 10));
        break;
      case 'CENTER':
        t.center()
        break;
      case 'GO':
        t.go(parseInt(val1, 10), parseInt(val2, 10))
        break;
      case 'GOX':
        t.gox(parseInt(val1, 10))
        break;
      case 'GOY':
        t.goy(parseInt(val1, 10))
        break;
      case 'PENWIDTH':
        t.penwidth(parseInt(val1, 10))
        break;
      case 'PENCOLOR':
        t.pencolor(val1)
        break;
      case 'PENDOWN':
        t.penDown = true;
        break;
      case 'PENUP':
        t.penDown = false;
        break;
      case 'RESET':
        t.reset();
        break;
      default:
        console.log(`Uknown command str: ${str}`)
    }
  });
  t.drawArrowhead();
}
