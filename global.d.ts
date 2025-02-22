declare module "*.css" {}

declare module "*.module.scss" {
  declare const styles: Record<string, string | undefined>;
  export default styles;
}
