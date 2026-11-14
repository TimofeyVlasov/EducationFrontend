import { Student } from '../../types/models';

export interface StudentsListProps {
    studentsList: Array<Student>;
    onItemClick?: (id: number) => void;
    onItemEdit?: (id: number) => void;
    onItemDelete?: (id: number) => void;
}