import React from "react";

const Card: React.FC<React.ComponentProps<"article">> = (props) => {
  const { children, className, ...otherProps } = props;
  return (
    <article
      className={`${className} rounded-xl border-[3px] border-primary-800 p-4`}
      {...otherProps}
    >
      {children}
    </article>
  );
};

export default Card;
