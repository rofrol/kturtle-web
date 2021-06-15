import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  // constructor() { }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  private ctx: CanvasRenderingContext2D | undefined;

  ngOnInit(): void {
    this.ctx = this.canvas!.nativeElement.getContext('2d')!;
  }

  animate(): void {
    this.ctx!.fillStyle = 'red';
    this.ctx!.fillRect(0, 0, 5, 5);
  }

}
