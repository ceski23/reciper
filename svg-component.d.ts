
declare module '~virtual/svg-component' {
  const Icon: ({name, className, style}: {name: "account" | "backArrow" | "home" | "info" | "more" | "palette" | "plus" | "recipes" | "scale" | "settings" | "sync", className?: string, style?: React.CSSProperties})=> JSX.Element;
  export const svgNames: ["account" , "backArrow" , "home" , "info" , "more" , "palette" , "plus" , "recipes" , "scale" , "settings" , "sync"];
  export type SvgName = "account" | "backArrow" | "home" | "info" | "more" | "palette" | "plus" | "recipes" | "scale" | "settings" | "sync";
  export default Icon;
}
