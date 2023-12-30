
declare module '~virtual/svg-component' {
  type IconProps = React.SVGProps<SVGSVGElement> & {
    name: SvgName
  }
  const Icon: (props: IconProps) => JSX.Element;
  export const svgNames: ["account" , "animation" , "backArrow" , "brightness" , "cancel" , "close" , "delete" , "error" , "fileDownload" , "fileUpload" , "fire" , "home" , "image" , "info" , "ingredient" , "link" , "minus" , "more" , "numbers" , "palette" , "pencil" , "plus" , "recipes" , "save" , "scale" , "search" , "settings" , "share" , "star" , "sync" , "timer" , "utensils"];
  export type SvgName = "account" | "animation" | "backArrow" | "brightness" | "cancel" | "close" | "delete" | "error" | "fileDownload" | "fileUpload" | "fire" | "home" | "image" | "info" | "ingredient" | "link" | "minus" | "more" | "numbers" | "palette" | "pencil" | "plus" | "recipes" | "save" | "scale" | "search" | "settings" | "share" | "star" | "sync" | "timer" | "utensils";
  export default Icon;
}
