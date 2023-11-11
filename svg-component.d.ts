
declare module '~virtual/svg-component' {
  type IconProps = React.SVGProps<SVGSVGElement> & {
    name: SvgName
  }
  const Icon: (props: IconProps) => JSX.Element;
  export const svgNames: ["account" , "animation" , "backArrow" , "brightness" , "cancel" , "close" , "delete" , "error" , "fileDownload" , "fileUpload" , "home" , "image" , "info" , "link" , "more" , "numbers" , "palette" , "plus" , "recipes" , "save" , "scale" , "search" , "settings" , "sync"];
  export type SvgName = "account" | "animation" | "backArrow" | "brightness" | "cancel" | "close" | "delete" | "error" | "fileDownload" | "fileUpload" | "home" | "image" | "info" | "link" | "more" | "numbers" | "palette" | "plus" | "recipes" | "save" | "scale" | "search" | "settings" | "sync";
  export default Icon;
}
