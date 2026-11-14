import { FC } from 'react';
import { IconProps } from '../../types/commonTypes';

export const UserIcon: FC<IconProps> = props => {
    const {
        className,
        color = '#ffffff',
        height = 24,
        width = 24,
        onClick
    } = props;

    return (
        <svg
            width={width}
            height={height}
            className={className}
            onClick={onClick}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2"/>
            <path d="M15 10C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10Z" stroke={color} strokeWidth="2"/>
            <path d="M6.16406 18.5C6.90074 16.5912 8.56373 16 12.0001 16C15.4661 16 17.128 16.5578 17.855 18.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
}
