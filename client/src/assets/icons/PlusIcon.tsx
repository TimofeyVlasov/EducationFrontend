import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const PlusIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#313131',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        <svg width={width} height={height} className={className} onClick={onClick} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}
