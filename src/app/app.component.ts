import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { UiStoreService } from './store/UiStoreService.service';
import { UserModuleComponent } from './modules/userModule/user-module.component';
import { RulesModuleComponent } from './modules/rulesModule/rules-module.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule, UserModuleComponent, RulesModuleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  public activeView$!: Observable<string>
  public loading = false;
  public view='userList';
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly uiStoreService: UiStoreService
  ) { }

  ngOnInit(): void {
    this.activeView$ = this.uiStoreService.getActiveView();
    this.getLoading();
  }
 
  getLoading() {
    this.uiStoreService.getGlobalLoading().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(e => {
      this.loading = e;
      this.cdr.detectChanges()
    })
  }

  toggleLoading(status: boolean) {
    this.uiStoreService.setGlobalLoading(status)
  }

  handleClick(view: string) {
    this.view= view;
    this.uiStoreService.setActiveView(view)
  }
}
