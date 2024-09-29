
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UiStoreService } from '../../../../store/UiStoreService.service';

@Component({
    selector: 'rules-detail',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [],
    templateUrl: './rules-detail.component.html',
    styleUrl: './rules-detail.component.scss'
})
export class RulesDetailComponent { 
    constructor(
        private readonly uiStoreService: UiStoreService
      ){}
    
    goBack(){
        this.uiStoreService.setActiveView('rulesList');
    }
}
