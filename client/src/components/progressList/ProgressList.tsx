import { FC } from 'react';
import { TrashIcon } from '../../assets/icons';
import { ProgressListProps } from './ProgressListProps';
import './progressListStyles.scss';

export const ProgressList: FC<ProgressListProps> = props => {
    const {
        progressList,
        onDelete
    } = props;

    const deleteHandler = (id: number) => {
        onDelete && onDelete(id);
    }

    return (
        <div className="progress-list">
            {progressList.map(progress => {
                return (
                    <div key={progress.id} className="progress-list__item">
                        <div className="progress-list__item-descr">
                            <span>{progress.description ?? 'Без описания'}</span>
                            <span className="progress-list__item-descr-modules">
                                Модулей: {progress.completedModules}
                            </span>
                        </div>
                        <div className="progress-list__item-actions">
                            <TrashIcon width={16} height={16} onClick={() => {deleteHandler(progress.id)}} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
