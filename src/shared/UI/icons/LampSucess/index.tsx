import React, { FC } from 'react';

interface Props {
  className?: string;
}

const LampSucess: FC<Props> = ({ className }) => {
  return (
    <img
		src="/svg/lamp/success.svg"
		alt="Lamp Sucess"
		className={className || ''}
    />
  );
};

export default LampSucess;
