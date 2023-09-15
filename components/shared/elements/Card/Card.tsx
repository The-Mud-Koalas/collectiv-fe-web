import React from "react";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <article className="border-3 border-primary-800 p-4">{children}</article>
  );
};

export default Card;
