import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import {FC} from 'react';
import {useAppDispatch} from '@/shared/hooks/store';
import {closeModal} from '@/store/modalSlice';

const PopupDiagnostic: FC = () => {
    // Для теста
    const mass = [
        {
            title: 'Выполнена команда закрыть',
            diagnosticState: null,
        },
        {
            title: 'Выполнена команда стоп',
            diagnosticState: null,
        },
        {
            title: 'Выполнена команда сброс ошибок',
            diagnosticState: true,
        },
        {
            title: 'Управление запрещено оператором',
            diagnosticState: false,
        },
    ];

    const dispatch = useAppDispatch();

    const handleClosePopupDiagnostic = (): void => {
        dispatch(closeModal());
    };

    return (
        <div className={styles.popupDiagnostic}>
            <div className={styles.popupDiagnostic_top}>
                <span className={styles.popupDiagnostic_top__text}>
                    ПКДВ-2
                </span>
                <Button
                    id="diagnostic-close"
                    width={26}
                    height={26}
                    onClick={handleClosePopupDiagnostic}
                    aria-label="Закрыть"
                    className={styles.closeButton}
                />
            </div>
            <ul className={styles.popupDiagnostic_center}>
                {mass.map((item, index) => (
                    <li key={index} className={styles.popupDiagnostic_center_item}>
                        <div
                            className={styles.popupDiagnostic_center_item__square}
                            data-state={item.diagnosticState}
                        ></div>
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className={styles.popupDiagnostic_bottom}>
                <span className={styles.popupDiagnostic_bottom__name}>
                    Какой-то Name
                </span>
                <Button
                    id='reset-diagnostic'
                    width={206}
                    height={38}
                    aria-label='Сброс диагностики'
                    text='Сброс диагностики'
                />
                <Button
                    id='sk-diagnostic'
                    width={69}
                    height={38}
                    aria-label='Ф.Ск'
                    text='Ф.Ск'
                />
                <Button
                    id='log-diagnostic'
                    width={97}
                    height={38}
                    aria-label='Журнал'
                    text='Журнал'
                    disabled={true}
                />
                <Button
                    id='control-diagnostic'
                    width={243}
                    height={38}
                    aria-label='Разрешить управление'
                    text='Разрешить управление'
                    disabled={true}
                />
            </div>
        </div>
    );
};

export default PopupDiagnostic;