import style from "@/components/Gate/Gate.module.scss";
import { FC } from "react";

interface GateProps {
  id: string;
  disable?: boolean;
}

export const Gate: FC<GateProps> = ({ id, disable }) => {
  return (
    <div className={`${style.gate}`} id={id}>
      <svg width="24" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-left"></use>
      </svg>
      <svg width="25" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-right"></use>
      </svg>
      {disable && (
        <svg className={style.cross} width="23" height="22" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-cross"></use>
        </svg>
      )}
    </div>
  );
};
