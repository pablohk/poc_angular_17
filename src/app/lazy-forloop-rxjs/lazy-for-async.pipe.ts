import { Pipe, type PipeTransform } from '@angular/core';
import {
  bufferCount,
  concatMap,
  delay,
  from,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';

@Pipe({
  name: 'LazyObs',
  standalone: true,
})
export class LazyObsPipe<T> implements PipeTransform {
  transform(
    obs: Observable<Array<T>>,
    buffer: number = 25,
    delayed: number = 100
  ): Observable<Array<T>> {
    const items: Array<T> = [];
    return obs.pipe(
      switchMap((e) =>{
        if(!e.length){
          return of([]) 
        }
        return from([...e]).pipe(
          bufferCount(buffer),
          concatMap((items, index) =>
            of(items).pipe(delay(index == 0 ? 0 : delayed))
          ),
          map((arr) => {
            items.push(...arr);
            return [...items];
          })
        )
      })
    );
  }
}
