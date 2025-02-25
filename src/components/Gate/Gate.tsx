import style from "@/components/Gate/Gate.module.scss";

export const Gate = ({ id, disable }: { id: string; disable?: boolean }) => {
  return (
    <div className={`${style.gate} ${disable}`} id={id}>
      {" "}
      {/* если запрещено управление disable={true}*/}
      <svg width="24" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-left"></use>
      </svg>
      <svg width="25" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-right"></use>
      </svg>
      {disable === true && (
        <svg className={style.cross} width="23" height="22" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-cross"></use>
        </svg>
      )}
    </div>
  );
};
