import { ActionCreator } from 'redux';

export interface IRole {
  id: string;
  title: string;
}

export type RolesActionType = {
  type: typeof ROLES;
  roles: Array<IRole>;
};

export const ROLES = 'ROLES';

export const RolesAction: ActionCreator<RolesActionType> = (roles: Array<IRole>) => ({
  type: ROLES,
  roles,
});