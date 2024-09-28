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

  protected setState<K extends keyof T, E extends Partial<Pick<T, K>>>(
    fn: (state: T) => E
  ): void {
    const currentState = this.getState();
    const incomingState = fn(currentState);
    const currentStateParse = JSON.stringify(currentState);
    const incomingStateParse = JSON.stringify(incomingState);
    console.log('---CurrentState:', currentState);
    console.log('---incomingState:', incomingState);
    if(incomingState && (currentStateParse !== incomingStateParse)){
        const newState = { ...currentState, ...incomingState };
        console.warn('---NewState:', newState);
        this._state.next(newState);
    }
  }
}
