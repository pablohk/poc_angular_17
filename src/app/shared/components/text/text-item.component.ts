import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'text-item',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './text-item.component.html',
    styleUrl: './text-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextItemComponent { }
