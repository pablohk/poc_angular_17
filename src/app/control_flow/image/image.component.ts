import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<img src="assets/metal.jpg"/>`,
  styleUrl: './image.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent { }
