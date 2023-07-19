export type ColorFunc = (str: string | number) => string;
export enum FrameworkType {
  REACT = 'react',
  VUE = 'vue',
  OTHERS = 'others',
}
export type Framework = {
  name: FrameworkType;
  display: string;
  color: ColorFunc;
  variants: FrameworkVariant[];
};

export type FrameworkVariant = {
  name: string;
  display: string;
  color: ColorFunc;
  url?: string;
  customCommand?: string;
};
