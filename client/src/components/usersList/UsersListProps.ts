import { User } from '../../types/models';

export interface UsersListProps {
    usersList: Array<Pick<User, 'id' | 'login' | 'role'>>;
    onSetAdminRole: (id: number) => void;
    onSetManagerRole: (id: number) => void;
    onResetPermissions: (id: number) => void;
}
