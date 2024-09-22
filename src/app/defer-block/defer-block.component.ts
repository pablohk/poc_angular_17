import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-defer-block',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './defer-block.component.html',
  styleUrl: './defer-block.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeferBlockComponent {
  @Input() value!: number;
 }
