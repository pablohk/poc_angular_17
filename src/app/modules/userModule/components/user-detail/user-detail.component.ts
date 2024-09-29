import { AsyncPipe, JsonPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { UiStoreService } from "../../../../store/UiStoreService.service";
import { UserStoreService } from "../../../../store/userStoreService.service";
import { IUser } from "../../models/user.models";
import { Observable, take } from "rxjs";
import { TNullable } from "../../../../models/sharedModels";

@Component({
  selector: "user-detail",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: "./user-detail.component.html",
  styleUrl: "./user-detail.component.scss",
})
export class UserDetailComponent {
  public userDetail$!: Observable<IUser>;
  constructor(
    private readonly uiStoreService: UiStoreService,
    private readonly userStoreSerivce: UserStoreService
  ) {
    this.uiStoreService
      .getUserIdSelected()
      .pipe(take(1))
      .subscribe((e: TNullable<string>) => {
        if (!!e ) {
          this.userDetail$ = this.userStoreSerivce.getUserDetail(e);
        }
      });
  }

  goBack() {
    this.uiStoreService.setActiveView("userListNoRefresh");
  }
}
