'use client';

import { useDispatch, useSelector } from 'react-redux';
import { buttonClicked } from '../Button/buttonsSlice';
import { RootState } from '../../store/store';
import Button from '../Button';
import styles from './styles.module.scss';

const ButtonsController = () => {
  const dispatch = useDispatch();
  const activeButtons = useSelector((state: RootState) => state.buttons.activeButtons);

  return (
    <div className={styles.controller}>
      {/* Кнопка 1 */}
      <Button
        text="Открыть"
        width={120}
        height={40}
        isActive={activeButtons['open'] ?? false}
        disabled={false} // Пример отключенной кнопки
        onClick={() => dispatch(buttonClicked('open'))}
      />

      {/* Кнопка 2 */}
      <Button
        text="Стоп"
        width={100}
        height={40}
        isActive={activeButtons['stop'] ?? false}
        disabled={false} // Пример отключенной кнопки
        onClick={() => dispatch(buttonClicked('stop'))}
      />

      {/* Кнопка 3 */}
      <Button
        width={50}
        height={50}
        image="./images/arrow.png"
        isActive={activeButtons['img'] ?? false}
        disabled={false} // Пример отключенной кнопки
        onClick={() => dispatch(buttonClicked('img'))}
      />
    </div>
  );
};

export default ButtonsController;


