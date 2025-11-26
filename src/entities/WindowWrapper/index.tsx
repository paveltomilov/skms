import { useAppSelector } from '@/shared/hooks/store';
import { RootState } from '@/store/store';
import { FC } from 'react';
import Window from '@/shared/UI/Window';
import { KeyWindows } from '@/shared/configs/window';

const WindowWrapper:FC<{windowKey:KeyWindows}> = ({windowKey}) => {

	const windows = useAppSelector((state: RootState) => state.windows);

    return (
   		<Window color="yellow" data={windows[windowKey]} right />
    );
};

export default WindowWrapper;