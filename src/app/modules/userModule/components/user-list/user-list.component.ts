import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { UiStoreService } from "../../../../store/UiStoreService.service";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";
import { IUser } from "../../models/user.models";
import { UserService } from "../../service/user.service";
import { UserStoreService } from "../../../../store/userStoreService.service";

@Component({
  selector: "user-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [CommonModule],
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit {
  public userList$!: Observable<Array<IUser>>;
  
  constructor(
    private readonly uiStoreService: UiStoreService,
    private readonly userStoreService: UserStoreService,
    private readonly userService: UserService
  ) {}

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
  }

  private fetchUserList(){
    this.uiStoreService.setGlobalLoading(true);
    this.userService.fetchUser().pipe(take(1)).subscribe((e:Array<IUser>)=>{
      this.userStoreService.setUserList(e);
      this.uiStoreService.setGlobalLoading(false);
    })
  };

  goTo(view: string) {
    this.uiStoreService.setActiveView(view);
  }
}
