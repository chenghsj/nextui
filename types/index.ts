import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type PickAndRename<
  T,
  PropMap extends Partial<Record<keyof T, string>>,
> = {
  [K in keyof PropMap as K extends keyof T
    ? PropMap[K] extends string
      ? PropMap[K]
      : never
    : never]: K extends keyof T ? T[K] : never;
};
