
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UiStoreService } from '../../../../store/UiStoreService.service';
import { ListItemComponent } from '../../../../shared/components/list-item/list-item.component';
import { CommonModule } from '@angular/common';
import { TextItemComponent } from '../../../../shared/components/text/text-item.component';

@Component({
    selector: 'rules-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
    imports: [CommonModule, ListItemComponent, TextItemComponent],
    templateUrl: './rules-list.component.html',
    styleUrl: './rules-list.component.scss'
})
export class RulesListComponent implements OnInit { 
    styleA!: any;
    styleB!: any
    constructor(
        private readonly uiStoreService: UiStoreService
      ){}

    ngOnInit(): void {
        this.styleA = {'background-color':'#bad9ba'}
        this.styleB = {'background-color':'yellow'}

        this.uiStoreService.setGlobalLoading(true);
        setTimeout(()=>this.uiStoreService.setGlobalLoading(false),1000)
    }
    
    goTo(view: string){
        this.uiStoreService.setActiveView(view);
    }
}
