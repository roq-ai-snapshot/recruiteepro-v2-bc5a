import { UserInterface } from 'interfaces/user';

export interface UserPermissionInterface {
  id?: string;
  user_id: string;
  permission: string;

  user?: UserInterface;
  _count?: {};
}
