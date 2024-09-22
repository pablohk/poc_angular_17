import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageComponent } from '../control_flow/image/image.component';

@Component({
  selector: 'app-defer-block-2',
  standalone: true,
  imports: [
    CommonModule,
    ImageComponent
  ],
  templateUrl: './defer-block-2.component.html',
  styleUrl: './defer-block-2.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferBlock2Component {
  @Input() value!: number;
 }
