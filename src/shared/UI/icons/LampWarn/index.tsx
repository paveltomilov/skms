import React, { FC } from 'react';

interface Props {
  className?: string;
}

const LampWarn: FC<Props> = ({ className }) => {
  return (
    <img
		src="/svg/lamp/warn.svg"
		alt="Lamp Warn"
		className={className || ''}
    />
  );
};

export default LampWarn;
