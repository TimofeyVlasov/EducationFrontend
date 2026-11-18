import { Enrollment } from '../../types/models';

export interface EnrollmentsListProps {
    enrollmentsList: Array<Enrollment>;
    onDelete?: (id: number) => void;
}
