
declare module '~virtual/svg-component' {
  const Icon: ({name}: {name: "home" | "recipes" | "settings"})=> JSX.Element;
  export const svgNames: ["home" , "recipes" , "settings"];
  export type SvgName = "home" | "recipes" | "settings";
  export default Icon;
}
