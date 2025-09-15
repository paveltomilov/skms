import { FC } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';


const OperatorPanel: FC = () => {

    return (
        <Button
            width={330}
            height={64}
        >
            {/* <Button
                width={44}
                height={44}
                image={{
                    src: '/images/operator.webp',
                    width: 40,
                    height: 40,
                }}
                style={{ padding: '1px' }}
                onClick={() => console.log('Кнопка оператор работает!')}
            /> */}
            <img src='/images/operator.webp'/>
            <div className={styles.footer__operator__wrapper}>
                <span className={styles.footer__operator}>Оператор:</span>
                <span className={styles.footer__operatorName}>
                    ASUTP_SMENA_V
                </span>
            </div>
        </Button>
    );
};
export default OperatorPanel;