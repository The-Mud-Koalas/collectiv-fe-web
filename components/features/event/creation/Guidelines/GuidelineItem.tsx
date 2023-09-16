import { Card, RoundedCircle } from "@/components/shared/elements";
import React from "react";

interface Props {
  title: string;
  description: string[];
  idx: number;
}

const GuidelineItem: React.FC<Props> = ({ title, description, idx }) => {
  return (
    <Card className="flex flex-col gap-3 w-full max-w-xs h-full max-h-72">
        <RoundedCircle width={22}>
          <p className="text-primary-800 text-lg font-bold">{idx}</p>
        </RoundedCircle>
        <h2 className="font-bold text-2xl w-full max-w-[17ch]">{title}</h2>
        <p className="font-medium text-base">{description.map((item, idx) => idx % 2 === 0 ? item : <span key={item} className="bg-secondary-200">{ item }</span>)}</p>
    </Card>
  );
};

export default GuidelineItem;
