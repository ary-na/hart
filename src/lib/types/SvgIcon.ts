// src/lib/types/SvgIcon.ts

import { SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  alt?: string;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}
