import { Injectable } from '@angular/core';
import { GenericStore } from './genericStore';
import { Observable } from 'rxjs';
import { IUser } from '../modules/userModule/models/user.models';

export interface IUserStore {
  userList: Array<IUser>;
  userDetailId: string | null;
}
export const initialState ={
  userList: [],
  userDetailId: null
}

@Injectable({
  providedIn: 'root'
})
export class UserStoreService extends GenericStore<IUserStore> {
  constructor() {
    super(initialState);
  }

  public getUserList(): Observable<Array<IUser>> {
    console.log('---getUserList')
    return this.select((state)=> state.userList) 
  }

  public setUserList(list: Array<IUser>) {
    console.log('---setUserList',list)
    this.setState((state) => ({
      ...state,
      userList: [...list]
    }));
  }

  public getUserDetailId(): Observable<string | null> {
    console.log('---getUserDetailId')
    return this.select((state)=> state.userDetailId) 
  }

  public setUserDetailId(id: string | null) {
    console.log('---setUserList',id)
    this.setState((state) => ({
      ...state,
      userDetailId: id
    }));
  }

}
