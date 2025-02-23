import { useDispatch, useSelector } from "react-redux";
import style from "./GateWindow.module.scss";
import { Gate } from "@/components/Gate/Gate";
import { initialState, setGateState } from "@/store/gateStateSlice";
import { setGateValue } from "@/store/gateValueSlice";

export const GateWindow = () => {
  const dispatch = useDispatch();
  const gateState = useSelector((state) => state.gateReducer);
  const gateValue = useSelector((state) => state.valueReducer);

  // функция для проверки изменения значения задвижки (создана исключительно для проверки)
  const handleInput = (e: InputEvent) => {
    dispatch(setGateValue(e?.target.value));
  };

  return (
    <>
      <div className={style.window}>
        <Gate id={gateState} />
        <div className={style.indication}>
          <span className={style.value}>{gateValue}</span>
          <span className={style.measurements}>м3/ч</span>
        </div>
      </div>
      {/* кнопки созданы для проверки состояний задвижки */}
      <button onClick={() => dispatch(setGateState(initialState[0]))}>
        Закрытое состояние
      </button>
      <button onClick={() => dispatch(setGateState(initialState[2]))}>
        Открытое состояние
      </button>
      <button onClick={() => dispatch(setGateState(initialState[1]))}>
        На закрытие состояние
      </button>
      <button onClick={() => dispatch(setGateState(initialState[3]))}>
        На открытие состояние
      </button>
      {/* инпут создан для проверки значения задвижки */}
      <input type="text" onChange={handleInput} />
    </>
  );
};
