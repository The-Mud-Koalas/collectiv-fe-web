import { inter } from "@/utils/constants/fonts";
import React from "react";

interface Props {
  title: string;
  description: string;
}

const EventTypeCard: React.FC<Props> = ({ title, description }) => {
  return (
    <article className="border-2 border-black bg-slate-200 p-4 rounded-xl drop-shadow-md">
      <div
        className={`${inter.className} mb-2 border-0 bg-primary-300 text-primary-800 rounded-full px-3 py-1 w-fit text-sm sm:text-base font-medium`}
      >
        {title}
      </div>
      <p  className={`${inter.className} font-medium text-sm sm:text-base`}>{ description }</p>
    </article>
  );
};

export default EventTypeCard;
