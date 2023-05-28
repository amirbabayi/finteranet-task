import {createReducer, on} from '@ngrx/store';
import * as UserActions from './actions';

export interface User {
  users: any;
}

export const initialState: User = {
  users: []
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.getUser, (state, {payload}) => ({...state, users: payload})),
);
