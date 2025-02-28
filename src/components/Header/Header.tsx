import { FC } from "react";
import style from "./Header.module.scss"
import { GateWindow } from "@c/GateWindow/GateWindow";

export const Header: FC = () => {
    return (
        <header className={style.header}>
            <div className={style.wrapper}>
            <button className={style.defense}>Работа защит</button>
                <span>ПТК</span>
                <button>Закрыть</button>
                <button>Стоп</button>
                <button>Открыть</button>
                <GateWindow />
                <button>Закрыть</button>
                <button>Стоп</button>
                <button>Открыть</button>
                <span>ПТК</span>
            </div>
        </header>
    )
}