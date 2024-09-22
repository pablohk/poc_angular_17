import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User{
  userId: number;
  data: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state!: BehaviorSubject<Array<User>>; 
  private _loading!: BehaviorSubject<boolean>; 

  constructor() { 
    this._state =  new BehaviorSubject([] as Array<User>);
    this._loading = new BehaviorSubject(false);
  }

  public getState() {
    this._loading.next(true);
    return this._state.asObservable();
  }

  public setState(data: Array<User>){
    this._state.next(data);
    this._loading.next(false);

  }

  public getLoading() {
    return this._loading.asObservable();
  }

  public setLoading(data: boolean){
    this._loading.next(data);
  }
}
