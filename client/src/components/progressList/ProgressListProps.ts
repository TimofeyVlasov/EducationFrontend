import { StudentProgress } from '../../types/models';

export interface ProgressListProps {
    progressList: Array<StudentProgress>;
    onDelete?: (id: number) => void;
}
