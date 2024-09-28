import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UiStoreService } from '../../../../store/UiStoreService.service';

@Component({
    selector: 'rules-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [CommonModule],
    templateUrl: './rules-list.component.html',
    styleUrl: './rules-list.component.scss'
})
export class RulesListComponent implements OnInit { 
    constructor(
        private readonly uiStoreService: UiStoreService
      ){}

    ngOnInit(): void {
        this.uiStoreService.setGlobalLoading(true);
        setTimeout(()=>this.uiStoreService.setGlobalLoading(false),1000)
    }
    
    goTo(view: string){
        this.uiStoreService.setActiveView(view);
    }
}
