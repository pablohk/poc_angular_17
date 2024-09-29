import { Injectable } from '@angular/core';
import { GenericStore } from './genericStore';
import { Observable } from 'rxjs';
import { IUser } from '../modules/userModule/models/user.models';
import { TNullable } from '../models/sharedModels';

export interface IUserStore {
  userList: Array<IUser>;
  userDetailId: TNullable<string>;
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

  public getUserDetail(id: string): Observable<IUser> {
    console.log('---getUserDetail')
    return this.select((state)=> state.userList.filter(e=> e.id === id)[0]) 
  }

  public resetUserStore():void {
    this.setState(()=>({
      ...initialState
    })
  )}
}
