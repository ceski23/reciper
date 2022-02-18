import { Variants } from 'framer-motion';

export const staggeredGrid: Variants = {
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const slideUp: Variants = {
  show: {
    y: 0,
    opacity: 1,
    transition: {
      bounce: 0,
    },
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
};
