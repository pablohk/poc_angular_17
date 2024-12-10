import { AsyncPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { UiStoreService } from "../../../../store/UiStoreService.service";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { IUser } from "../../models/user.models";
import { UserService } from "../../service/user.service";
import { UserStoreService } from "../../../../store/userStoreService.service";
import { LazyObsPipe } from "../../../../shared/pipes/layzObs.pipe.";

@Component({
  selector: "user-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [AsyncPipe, LazyObsPipe],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit, OnChanges {
  public userList$!: Observable<Array<IUser>>;
  
  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly uiStoreService: UiStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly userService: UserService
  ) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('---UserListComponent changes', changes)
  } 

  ngOnInit(): void {
    this.getCurrentView();
    this.getUserList();
  }

  private getCurrentView() {
    this.uiStoreService
      .getActiveView()
      .pipe(take(1))
      .subscribe((e) => {
        if (e && e !== "userListNoRefresh") {
          this.fetchUserList();
        }
      });
  }

  private getUserList(){
    this.userList$= this.userStoreService.getUserList();
    this.cdr.detectChanges();
  }

  private fetchUserList(){
    this.uiStoreService.setGlobalLoading(true);
    this.userStoreService.resetUserStore();
    this.userService.fetchUser().pipe(take(1)).subscribe((e:Array<IUser>)=>{
      this.userStoreService.setUserList(e);
      this.uiStoreService.setGlobalLoading(false);
    })
  };

  goToDetail(id: string) {
    this.uiStoreService.setUserIdSelected(id);
    this.uiStoreService.setActiveView('userDetail');
  }

}
