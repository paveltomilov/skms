import style from"./Gate.module.scss";

export const Gate = () => {
  
  return (
    <div id={style.open}>
        <svg width="25" height="26" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-gate-left"></use>
        </svg>
        <svg width="25" height="26" aria-hidden="true">
          <use xlinkHref="/images/sprite.svg#icon-gate-right"></use>
        </svg>
    </div>
  );
};
