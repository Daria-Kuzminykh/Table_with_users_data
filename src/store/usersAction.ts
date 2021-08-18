import { ActionCreator } from 'redux';
import {IRole} from "./rolesAction";

export interface IUser {
  id: string;
  surname: string;
  name: string;
  middleName: string;
  fullName: string;
  birthday: string;
  birthPlace: string;
  email: string;
  role: IRole;
  phoneNumber: string;
  registerDate: string;
  lastUpdate: string;
}

export type UsersActionType = {
  type: typeof USERS;
  data: Array<IUser>;
};

export const USERS = 'USERS';

export const UsersAction: ActionCreator<UsersActionType> = (data: Array<IUser>) => ({
  type: USERS,
  data,
});