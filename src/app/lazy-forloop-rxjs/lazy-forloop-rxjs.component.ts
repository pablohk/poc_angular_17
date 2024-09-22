import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { User, StoreService } from '../control_flow/storeService.service';
import {  Observable } from 'rxjs';
import { skip } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeferBlock2Component } from '../defer-block-2/defer-block-2.component';
import { LazyObsPipe } from './lazy-for-async.pipe';

@Component({
  selector: 'app-lazy-forloop-rxjs',
  standalone: true,
  templateUrl: './lazy-forloop-rxjs.component.html',
  styleUrl: './lazy-forloop-rxjs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DeferBlock2Component, LazyObsPipe],
})
export class LazyForloopRxjsComponent implements OnInit {

  public users$!: Observable<User[]>;
  public users2$!: Observable<User[]>;

  public loading!: boolean;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeService
      .getLoading()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        this.loading = e;
      });

    const payload = Array.from(Array(500).keys()).map((e) => ({
      userId: e,
      data: `${e}--data`,
      date: new Date(),
    }));
    this.users$ = this.storeService.getState();
    setTimeout(() => this.storeService.setState(payload), 1000);

  }

  public userByName(_index: number, user: User): number {
    return user?.userId;
  }

}

