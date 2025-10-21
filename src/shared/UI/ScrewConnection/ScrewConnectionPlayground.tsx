import { FC, useState } from 'react';
import ScrewConnection, { Props } from '.';

// компонент обертка для реализации функционала в storyBook
const ScrewConnectionPlayground: FC<Props> = props => {
	const [status, setStatus] = useState<'close' | 'open'>(
		props.screwStatus ?? 'close',
	);
	return (
		<ScrewConnection
			{...props}
			screwStatus={status}
			onToggle={() =>
				setStatus(prev => (prev === 'open' ? 'close' : 'open'))
			}
		/>
	);
};

export default ScrewConnectionPlayground;
