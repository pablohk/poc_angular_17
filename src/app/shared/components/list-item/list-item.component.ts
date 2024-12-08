import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "list-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list-item.component.html",
  styleUrl: "./list-item.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ListItemComponent {
  @Input() contentStyle!: any;

}
