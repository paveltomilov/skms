import style from "./GateWindow.module.scss";
import { Gate } from "@/components/Gate/Gate"

export const GateWindow = () => {
  return (
    <div className={style.window}>
        <Gate />
      <div className={style.indication}>
        <span className={style.value}>18.8</span>
        <span className={style.measurements}>м3/ч</span>
      </div>
    </div>
  );
};
