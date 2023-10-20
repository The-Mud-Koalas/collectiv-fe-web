import { Star } from "@/components/shared/svg/icons";
import React, { useEffect, useState } from "react";

const RATINGS = [1, 2, 3, 4, 5];

interface Props {
  selectedStar: number | null;
  onStarSelect: (rating: number) => React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const StarRating: React.FC<Props> = ({ onStarSelect, selectedStar }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [inStarFlexbox, setInStarFlexbox] = useState(false);

  const starIsYellow = (rating: number) =>
    inStarFlexbox ? rating <= hoveredStar! : rating <= selectedStar!;

  return (
    <div
      className="flex gap-4 relative -left-7 my-3"
      onMouseLeave={() => {
        setHoveredStar(null);
        setInStarFlexbox(false);
      }}
      onMouseEnter={() => setInStarFlexbox(true)}
    >
      <div
        className="w-3"
        onMouseOver={() => setHoveredStar(0)}
        onClick={onStarSelect(0)}
      ></div>
      {RATINGS.map((rating) => (
        <button
          key={rating}
          onMouseOver={() => setHoveredStar(rating)}
          onClick={onStarSelect(rating)}
        >
          <Star
            color={starIsYellow(rating) ? "#ffe234" : "none"}
            dimensions={{ width: 25 }}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
