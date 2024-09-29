import { Injectable } from '@angular/core';
import { GenericStore } from './genericStore';
import { Observable } from 'rxjs';

export interface IuiStore{
  activeView: string;
  globalLoading: boolean;
  userIdSelected: string | null;
}

export const initialState ={
  activeView: 'userList',
  globalLoading: false,
  userIdSelected: null,
}

@Injectable({
  providedIn: 'root'
})
export class UiStoreService extends GenericStore<IuiStore> {
  constructor() {
    super(initialState);
  }

  public getActiveView(): Observable<string> {
    console.log('---getActiveView')
    return this.select((state)=> state.activeView) 
  }

  public setActiveView(view: string) {
    console.log('---SetActiveView',view)
    this.setState((state) => ({
      ...state,
      activeView: view
    }));
  }

  public getGlobalLoading(): Observable<boolean> {
    console.log('---getLoading')
    return this.select((state)=> state.globalLoading) 
  }

  public setGlobalLoading(loading: boolean) {
    console.log('---setGlobalLoading',loading)
    this.setState((state) => ({
      ...state,
      globalLoading: loading
    }));
  }

  public getLUserIdSelected(): Observable<string | null> {
    console.log('---getLUserIdSelected')
    return this.select((state)=> state.userIdSelected) 
  }

  public setUserIdSelected(id: string | null) {
    console.log('---setUserIdSelected',id)
    this.setState((state) => ({
      ...state,
      userIdSelected: id
    }));
  }

}
