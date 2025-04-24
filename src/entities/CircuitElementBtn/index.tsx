import { ICircuitElement } from '@/shared/configs/schemePart';
import styles from './styles.module.scss';
import { FC } from 'react';
import { useAppDispatch } from '@/shared/hooks/store';
import { openPopup } from '@/store/popupSlice';
import { PopupContent } from '@/shared/types/popup';

export const CircuitElementBtn: FC<ICircuitElement> = ({id, icon, title}) => {
    const dispatch = useAppDispatch();
    
        const handleOpenPopup = (content: PopupContent | null = null) => {
            dispatch(openPopup({ isOpen: true, content }));
        };

	return (
		<button
			className={`${styles.mockButton} ${styles[id]}`}
			id={id}
			onClick={() =>
				handleOpenPopup({
					id: id,
					icon: icon,
					title: title,
					buttons: [
						{
							id: 'btn4',
							width: 238,
							height: 35,
							text: 'ОК',
						},
						{
							id: 'btn5',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
						{
							id: 'btn6',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
						{
							id: 'btn7',
							width: 238,
							height: 35,
							text: 'дополнительная кнопка',
						},
					],
				})
			}
		></button>
	);
};
