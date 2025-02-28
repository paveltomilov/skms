import { FC } from "react";
import style from "./Header.module.scss";
import { GateWindow } from "@c/GateWindow/GateWindow";
import { useDispatch } from "react-redux";
import { setGateState } from "@/store/gateStateSlice";

export const Header: FC = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setGateState({ state: "toClose", value: 18.8 }));
  };

  const handleOpen = () => {
    dispatch(setGateState({ state: "toOpen", value: 18.8 }));
  };

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <button className={style.defense}>Работа защит</button>

        <div className={style.part}>
          <span>птк</span>
          <button onClick={handleClose}>Закрыть</button>
          <button>Стоп</button>
          <button onClick={handleOpen}>Открыть</button>
        </div>

        <GateWindow />

        <div className={style.part}>
          <button>Закрыть</button>
          <button>Стоп</button>
          <button>Открыть</button>
          <span>Круза-п</span>
        </div>
      </div>
    </header>
  );
};
