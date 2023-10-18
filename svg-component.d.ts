
declare module '~virtual/svg-component' {
  const Icon: ({name}: {name: "backArrow" | "home" | "more" | "recipes" | "settings"})=> JSX.Element;
  export const svgNames: ["backArrow" , "home" , "more" , "recipes" , "settings"];
  export type SvgName = "backArrow" | "home" | "more" | "recipes" | "settings";
  export default Icon;
}
