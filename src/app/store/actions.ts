import {createAction, props} from '@ngrx/store';
import {User} from "./reducers";

export const getUser = createAction(
  '[User API] Get',
  props<{ payload: User | null }>()
);

export const updateUser = createAction(
  '[User API] Update',
  props<{ payload: User | null }>()
);
