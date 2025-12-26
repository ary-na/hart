// src/lib/ui/EmptyGallerySvg.tsx

import { SvgIconProps } from "@hart/lib/types";

export const EmptyGallerySvg = ({
  alt,
  className,
  width,
  height,
  title,
  ...rest
}: SvgIconProps) => {
  return (
    <svg
      width={width ?? 175}
      height={height ?? 147}
      viewBox="0 0 175 147"
      fill="currentColor"
      className={`${className}`}
      aria-label={alt}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <rect
        x="36.7444"
        y="13.0002"
        width="17.7778"
        height="120.985"
        rx="2"
        transform="rotate(7 36.7444 13.0002)"
      />
      <rect
        width="17.7778"
        height="133.464"
        rx="2"
        transform="matrix(0.992546 -0.121869 -0.121869 -0.992546 136.265 134.636)"
      />
      <rect
        x="8"
        y="110.831"
        width="80"
        height="160"
        rx="8"
        transform="rotate(-90 8 110.831)"
      />
    </svg>
  );
};
