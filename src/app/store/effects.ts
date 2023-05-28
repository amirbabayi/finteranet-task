import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {exhaustMap, map,} from 'rxjs/operators';
import {UserService} from "../core/services/user.service";
import {getUser} from './actions';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
      ofType(getUser.type),
      exhaustMap(() => this.userService.getAllUsers()
        .pipe(
          map((users: any) => ({type: getUser.type, payload: users.users})),
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {
  }
}
