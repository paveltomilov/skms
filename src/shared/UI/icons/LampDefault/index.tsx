import React, { FC } from 'react';

interface Props {
  className?: string;
}

const LampDefault: FC<Props> = ({ className }) => {
  return (
    <img
        src="/svg/lamp/default.svg"
        alt="Lamp Default"
        className={className || ''}
    />
  );
};

export default LampDefault;
