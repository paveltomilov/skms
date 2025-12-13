import React from 'react';

type Props = {
    size?: number | string;
    className?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
};

const PlayIcon: React.FC<Props> = ({ size, className, onClick }) => (
    <svg
        className={className ?? ''}
        width={size ?? '22'}
        height={size ?? '24'}
        viewBox="0 0 22 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M17.1455 8.05697C19.55 9.47447 20.753 10.184 21.1385 11.0915C21.3053 11.4823 21.3871 11.9042 21.3786 12.329C21.37 12.7539 21.2713 13.1721 21.089 13.556C20.6645 14.447 19.4345 15.1055 16.973 16.424L7.5665 21.461C5.2355 22.7075 4.0715 23.3315 3.119 23.21C2.70856 23.1573 2.31345 23.0204 1.9585 22.8077C1.60356 22.5949 1.29645 22.3111 1.0565 21.974C0.5 21.194 0.5 19.874 0.5 17.2295V6.64397C0.5 3.89147 0.5 2.51447 1.0775 1.72397C1.32677 1.38304 1.64522 1.09857 2.01202 0.889199C2.37881 0.679825 2.78568 0.550257 3.206 0.508973C4.181 0.411473 5.366 1.11047 7.7375 2.50997L17.1455 8.05697Z"
            fill="none"
            stroke="none"
            strokeOpacity="0.16"
        />
    </svg>
);

export default PlayIcon;