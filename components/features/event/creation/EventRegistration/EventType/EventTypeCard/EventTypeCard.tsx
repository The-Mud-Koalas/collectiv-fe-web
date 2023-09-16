import { Card } from "@/components/shared/elements";
import { inter } from "@/utils/constants/fonts";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const EventTypeCard: React.FC<Props> = ({ title, description }) => {
  return (
    <article className="bg-slate-200 p-4 rounded-xl drop-shadow-md">
      <div
        className={`${inter.className} mb-2 border-0 bg-primary-300 text-primary-800 rounded-full px-3 py-1 w-fit font-medium`}
      >
        {title}
      </div>
      <p  className={`${inter.className} font-medium text-base`}>{ description }</p>
    </article>
  );
};

export default EventTypeCard;
