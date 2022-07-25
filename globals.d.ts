declare module '*.scss';

declare module "*.less";
interface StyleModule {
    [key: string]: string;
  }

declare module "*.styl?css-modules" {
    const style: StyleModule;
    export default style;
  }
declare module "*.scss?css-modules" {
    const style: StyleModule;
    export default style;
  }