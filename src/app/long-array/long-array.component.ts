import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { User, StoreService } from '../control_flow/storeService.service';
import { skip } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DeferBlock2Component } from '../defer-block-2/defer-block-2.component';

@Component({
  selector: 'app-long-array',
  standalone: true,
  templateUrl: './long-array.component.html',
  styleUrl: './long-array.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DeferBlock2Component],
})
export class LongArrayComponent implements OnInit {
  @ViewChild('itemsContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @ViewChild('item', { read: TemplateRef }) template!: TemplateRef<any>;

  public value = 0;
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
    this.storeService
      .getState()
      .pipe(takeUntilDestroyed(this.destroyRef), skip(1))
      .subscribe((e) => {
        if (e && e.length) {
          this.progressiveRendering(e, {
            ITEMS_RENDERED_AT_ONCE: 20,
            INTERVAL_IN_MS: 100,
          });
        }
      });
    const payload = Array.from(Array(1000).keys()).map((e) => ({
      userId: e,
      data: `${e}--data`,
      date: new Date(),
    }));
    setTimeout(() => this.storeService.setState(payload), 1000);
  }

  private progressiveRendering(payload: Array<User>, config: any) {
    const { ITEMS_RENDERED_AT_ONCE, INTERVAL_IN_MS } = config;
    const size = payload.length;
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      const nextIndex = currentIndex + ITEMS_RENDERED_AT_ONCE;
      for (let n = currentIndex; n < nextIndex; n++) {
        if (n >= size) {
          clearInterval(intervalId);
          break;
        }
        const context = {
          item: { ...payload[n] },
        };
        this.container.createEmbeddedView(this.template, context);
      }
      currentIndex += ITEMS_RENDERED_AT_ONCE;
      this.cdr.markForCheck();
    }, INTERVAL_IN_MS);
  }
}
