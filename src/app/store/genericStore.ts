import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";

@Injectable()
export abstract class GenericStore<T> {
  private _state: BehaviorSubject<T>;

  constructor(@Inject("") initialState: T) {
    this._state = new BehaviorSubject<T>(initialState);
  }

  private getStateAsObs(): Observable<T> {
    return this._state.asObservable();
  }

  private getState(): T {
    return this._state.getValue();
  }

  protected select<K>(selector: (state: T) => K): Observable<K> {
    return this.getStateAsObs()
        .pipe(
            map(selector), 
            distinctUntilChanged()
        );
  }

  protected setState(fn: (state: T) => T): void {
    const currentState = this.getState();
    const incomingState = fn(currentState);
    
    if (incomingState && !this.isEqual(currentState, incomingState)) {
      console.log('---NEW');
      this._state.next({...incomingState});
    }
    
  }

  private isEqual(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) return true;
    if (!obj1 || !obj2) return false;
    
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) return false;
    
    return keys1.every(key => 
      obj1[key as keyof T] === obj2[key as keyof T] || 
      (typeof obj1[key as keyof T] === 'object' && 
       typeof obj2[key as keyof T] === 'object' && 
       this.isEqual(obj1[key as keyof T] as T, obj2[key as keyof T] as T))
    );
  }

}
