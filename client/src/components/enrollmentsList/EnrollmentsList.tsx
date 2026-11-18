import { FC } from 'react';
import { TrashIcon } from '../../assets/icons';
import { EnrollmentsListProps } from './EnrollmentsListProps';
import './enrollmentsListStyles.scss';

export const EnrollmentsList: FC<EnrollmentsListProps> = props => {
    const {
        enrollmentsList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id);
    }

    return (
        <div className="enrollments-list">
            {enrollmentsList.map(enrollment => {
                return (
                    <div key={enrollment.id} className="enrollments-list__item">
                        <div className="enrollments-list__item-descr">
                            <span className="enrollments-list__item-descr-title">
                                {enrollment.moduleName}
                            </span>
                            <span className="enrollments-list__item-descr-description">
                                {`${enrollment.status}, оценка: ${enrollment.grade}`}
                            </span>
                        </div>
                        <div className="enrollments-list__item-actions">
                            <TrashIcon width={16} height={16} onClick={() => {deleteHandler(enrollment.id)}} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
