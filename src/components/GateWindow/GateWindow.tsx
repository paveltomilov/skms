import { useSelector } from "react-redux";
import style from "./GateWindow.module.scss";
import { Gate } from "@/components/Gate/Gate";

export const GateWindow = () => {
  const gateState = useSelector((state) => state.gateReducer);
  const gateValue = useSelector((state) => state.valueReducer);

  return (
    <>
      <div className={style.window}>
        <Gate id={gateState} disable={true} />
        <div className={style.indication}>
          <span className={style.value}>{gateValue}</span>
          <span className={style.measurements}>м3/ч</span>
        </div>
      </div>
    </>
  );
};
