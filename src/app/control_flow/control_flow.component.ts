import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { DeferBlockComponent } from '../defer-block/defer-block.component';
import { User, StoreService } from './storeService.service';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeferBlock2Component } from '../defer-block-2/defer-block-2.component';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  templateUrl: './control_flow.component.html',
  styleUrl: './control_flow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DeferBlockComponent, DeferBlock2Component],
})
export class ControlFlowComponent implements OnInit {
  public users$!: Observable<User[]>;
  public loading!: boolean;
  destroyRef = inject(DestroyRef);

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.users$ = this.storeService.getState();
    this.storeService
      .getLoading()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        this.loading = e;
      });

    const payload = Array.from(Array(10000).keys()).map((e) => ({
      userId: e,
      data: `${e}--data`,
      date: new Date(),
    }));
    setTimeout(() => this.storeService.setState(payload), 1000);
  }

  public userByName(index: number, user: User): number {
    return user?.userId;
  }
}
