import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OperationsComponent } from '../operations/operations.component';

@Component({
  selector: 'app-absolute',
  standalone: true,
  imports: [
    CommonModule,
    OperationsComponent
  ],
  templateUrl: './absolute.component.html',
  styleUrl: './absolute.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsoluteComponent { }
