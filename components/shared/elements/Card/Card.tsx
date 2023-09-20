import { MotionProps, motion } from "framer-motion";
import React from "react";

const Card: React.FC<React.ComponentProps<"article">> = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <motion.article
      className={`rounded-xl border-[3px] border-primary-800 p-4 ${className}`}
      {...otherProps as MotionProps}
    >
      {children}
    </motion.article>
  );
};

export default Card;
