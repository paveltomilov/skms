export const Gate = ({ id }: { id: string }) => {
  return (
    <div id={id}>
      <svg width="25" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-left"></use>
      </svg>
      <svg width="25" height="26" aria-hidden="true">
        <use xlinkHref="/images/sprite.svg#icon-gate-right"></use>
      </svg>
    </div>
  );
};
