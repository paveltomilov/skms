import React, { FC } from 'react';
import Image from 'next/image';

interface Props {
	className?: string;
	variant?: 'default' | 'success' | 'error' | 'warn';
}

const lampSrcMap = {
	default: '/svg/lamp/default.svg',
	success: '/svg/lamp/success.svg',
	error: '/svg/lamp/error.svg',
	warn: '/svg/lamp/warn.svg',
};

const Lamp: FC<Props> = ({ className, variant = 'default' }) => {
	const src = lampSrcMap[variant] || lampSrcMap.default;
	const alt = `Lamp ${variant.charAt(0).toUpperCase() + variant.slice(1)}`;

	return (
		<Image
			src={src}
			alt={alt}
			className={className || ''}
			width={24}
			height={24}
		/>
	);
};

export default Lamp;
