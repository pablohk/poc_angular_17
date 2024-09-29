import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiStoreService } from '../../store/UiStoreService.service';
import { Observable } from 'rxjs';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { RulesDetailComponent } from './components/rules-detail/rules-detail.component';

@Component({
    selector: 'rules-module',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [CommonModule, RulesListComponent, RulesDetailComponent],
    templateUrl: './rules-module.component.html',
    styleUrl: './rules-module.component.scss'
})
export class RulesModuleComponent implements OnInit{
    public activeView$!: Observable<string>;

    constructor(
        private readonly uiStoreService: UiStoreService
    ) { }

    ngOnInit(): void {
        this.getCurrentView();
    }

    private getCurrentView() {
        this.activeView$ = this.uiStoreService.getActiveView();
    }
}
