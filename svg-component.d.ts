
declare module '~virtual/svg-component' {
  const Icon: ({name}: {name: "backArrow" | "home" | "more" | "recipes" | "settings" | "sync"})=> JSX.Element;
  export const svgNames: ["backArrow" , "home" , "more" , "recipes" , "settings" , "sync"];
  export type SvgName = "backArrow" | "home" | "more" | "recipes" | "settings" | "sync";
  export default Icon;
}
