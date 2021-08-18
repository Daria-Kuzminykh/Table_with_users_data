import {Reducer} from "redux";
import {IUser, USERS, UsersActionType} from "./usersAction";
import {IRole, ROLES, RolesActionType} from "./rolesAction";

export interface IRootState {
  data: Array<IUser>;
  roles: Array<IRole>;
}

const initialState: IRootState = {
  data: [],
  roles: [],
}

type MyAction = UsersActionType | RolesActionType;
export const rootReducer: Reducer<IRootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        data: action.data,
      };
    case ROLES:
      return {
        ...state,
        roles: action.roles,
      };
    default:
      return state;
  }
}
