import { FC } from 'react';

interface Props {
  className?: string;
}

const LampError
: FC<Props> = ({ className }) => {
  return (
    <img
		src="/svg/lamp/error.svg"
		alt="Lamp Error"
		className={className || ''}
	/>
  );
};

export default LampError
;
