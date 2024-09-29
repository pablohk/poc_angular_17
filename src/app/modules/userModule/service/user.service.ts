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
        const rdm = Math.round(Math.random()) < 0.5
        return of(rdm ? mock : mock.slice(0,10)).pipe(delay(1000))
    }
}
