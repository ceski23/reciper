declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare const APP_VERSION: string;

// Implemented by core-js/proposals/set-methods
interface Set<T> {
  difference(iterable: Iterable<T>): Set<T>;
  intersection(iterable: Iterable<T>): Set<T>;
  isDisjointFrom(iterable: Iterable<T>): boolean;
  isSubsetOf(iterable: Iterable<T>): boolean;
  isSupersetOf(iterable: Iterable<T>): boolean;
  symmetricDifference(iterable: Iterable<T>): Set<T>;
  union(iterable: Iterable<T>): Set<T>;
}
