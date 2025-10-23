import { ICON_COLOR, SCHEME_ICON_SIZE } from '@/shared/configs/icon';
import { LampIndicatorColor } from '@/shared/types/icon';
import { SchemeIconType } from '@/shared/types/scheme';
import { FC } from 'react';

interface Props {
  type?: Extract<SchemeIconType, 'lamp'>;
  color?: LampIndicatorColor;
  className?: string;
  style?: React.CSSProperties;
}

const LampIndicator: FC<Props> = ({
  type = 'lamp',
  color = 'lamp_white_off',
  className,
  style,
}) => {
  const sizes = SCHEME_ICON_SIZE[type];
  const topColor = (ICON_COLOR[color] ?? ICON_COLOR.lamp_white_off) as string;
  const isOffState = color === 'lamp_white_off' || color === 'lamp_green_off';

  return (
      <svg
        width={sizes.width}
        height={sizes.height}
        viewBox="0 0 291 403"
        aria-hidden
        className={className}
        style={style}
        preserveAspectRatio="xMidYMid meet"
      >
        <use href="/svg/sprite.svg#lampIndicator-base" width="100%" height="100%" />
        {!isOffState &&
          <use
            href="/svg/sprite.svg#lampIndicator-light"
            width="100%"
            height="100%"
            style={{ color: topColor }}
          />}
        <use
          href="/svg/sprite.svg#lampIndicator-top"
          width="100%"
          height="100%"
          style={{ color: topColor, opacity: isOffState ? 0.7 : 1 }}
        />
      </svg>
  );
};

export default LampIndicator;
