// src/lib/types/SvgIcon.ts

import { SVGProps } from "react";

export interface SvgIconProps extends SVGProps<SVGSVGElement> {
  label?: string;
  title?: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}
