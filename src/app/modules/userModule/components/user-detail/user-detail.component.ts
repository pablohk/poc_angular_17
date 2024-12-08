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
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: "user-detail",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [AsyncPipe, JsonPipe, NgOptimizedImage],
  templateUrl: "./user-detail.component.html",
  styleUrl: "./user-detail.component.scss",
})
export class UserDetailComponent {
  public userDetail$!: Observable<IUser>;
  public readonly photo ="assets/a.jpg";

  constructor(
    private readonly uiStoreService: UiStoreService,
    private readonly userStoreSerivce: UserStoreService
  ) {
    this.uiStoreService.setGlobalLoading(true)    
    this.uiStoreService
      .getUserIdSelected()
      .pipe(take(1))
      .subscribe((e: TNullable<string>) => {
        if (!!e ) {
          this.userDetail$ = this.userStoreSerivce.getUserDetail(e);
        }
      });
  }
  dosomething(){
    console.log('---')
    this.uiStoreService.setGlobalLoading(false)
  }
  goBack() {
    this.uiStoreService.setActiveView("userListNoRefresh");
  }
}
