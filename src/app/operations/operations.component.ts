import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-operations',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './operations.component.html',
  styleUrl: './operations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationsComponent { 
  public oper= [
    'uno',
    'texto largo',
    'tres',
    'cuatro',
    'cinco'
  ]
}
