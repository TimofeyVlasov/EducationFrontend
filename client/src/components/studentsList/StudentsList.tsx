import { FC, useState } from 'react';
import { StudentsListProps } from './StudentsListProps';
import './studentsListStyles.scss';
import clsx from 'classnames';
import { PencilIcon, TrashIcon } from '../../assets/icons';

export const StudentsList: FC<StudentsListProps> = props => {
    const { studentsList, onItemClick, onItemDelete, onItemEdit } = props;
    const [selectedUser, setSelectedUser] = useState(0);

    const studentClickHandler = (id: number) => {
        setSelectedUser(id);
        onItemClick && onItemClick(id);
    }

    const studentEditHandler = (id: number) => {
        onItemEdit && onItemEdit(id);
    }

    const studentDeleteHandler = (id: number) => {
        onItemDelete && onItemDelete(id);
    }
    const isSelected = (id: number) => selectedUser === id;

    return (
        <div className="std-list">
            {studentsList.map(user => {
                return (
                    <div key={user.id}
                        className={clsx('std-list__item', {'std-list__item_selected': isSelected(user.id)})}
                        onClick={() => studentClickHandler(user.id)}
                    >
                        <div className="std-list__item-fio">
                            {`${user.lastName} ${user.firstName} ${user.middleName ?? ''}`.trim()}
                        </div>
                        <div className="std-list__item_actions">
                            <PencilIcon width={18} height={18} onClick={() => {studentEditHandler(user.id)}} />
                            <TrashIcon width={18} height={18} onClick={() => {studentDeleteHandler(user.id)}} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
