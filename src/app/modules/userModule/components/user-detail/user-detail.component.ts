import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UiStoreService } from '../../../../store/UiStoreService.service';

@Component({
    selector: 'user-detail',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [CommonModule],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent { 
    constructor(
        private readonly uiStoreService: UiStoreService
      ){}
    
    goBack(){
        this.uiStoreService.setActiveView('userListNoRefresh');
    }
}
