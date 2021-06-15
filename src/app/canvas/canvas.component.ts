import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  // constructor() { }

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    const canvas = this.canvas.nativeElement;
    if (canvas === null) return;
    if (canvas.parentElement === null) return;
    canvas.height = canvas.parentElement.offsetHeight * devicePixelRatio;
    canvas.width = canvas.parentElement.offsetWidth * devicePixelRatio;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.animate();
  }

  animate(): void {
    this.ctx!.scale(devicePixelRatio, devicePixelRatio);
    // this.ctx!.fillStyle = '#ddd';
    // const canvas = this.canvas!.nativeElement;
    // this.ctx!.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(100, 100, 125, 125);
  }

}
