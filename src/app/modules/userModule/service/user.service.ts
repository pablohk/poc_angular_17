import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IUser } from '../models/user.models';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor() { }

    fetchUser(): Observable<Array<IUser>> {
        const mock: Array<IUser> = Array.from(Array(100).keys()).map(e => (
            {
                id: `${e}`,
                name: `name-${e}`,
                date: `${e}-00-100`,
                rules: [`rule-${e}-0`, `rule-${e}-1`, `rule-${e}-2`],
            }
        ));
        return of(mock).pipe(delay(1000))
    }
}
