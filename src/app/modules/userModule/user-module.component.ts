import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { UiStoreService } from '../../store/UiStoreService.service';
import { Observable } from 'rxjs';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@Component({
    selector: 'user-module',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [AsyncPipe, NgTemplateOutlet, UserListComponent, UserDetailComponent],
    templateUrl: './user-module.component.html',
    styleUrl: './user-module.component.scss'
})
export class UserModuleComponent implements OnInit{
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
