import React from "react";
import { Chevron } from "../../svg/icons";
import { COLORS } from "@/utils/constants/colors";

interface Props {
  noOfPages: number | null;
  currentPage: number;
  prev?: number | null;
  next?: number | null;
  changePage: (page: number) => () => void;
}

const PageToggler: React.FC<Props> = ({
  noOfPages,
  currentPage,
  prev,
  next,
  changePage,
}) => {
  return (
    <div className="flex">
      <div className="rotate-90">
        <Chevron color={COLORS.primary[800]} dimensions={{ width: 25 }} />
      </div>
      <div className="flex gap-4">
        {
            
        }
      </div>
      <div className="-rotate-90">
        <Chevron color={COLORS.primary[800]} dimensions={{ width: 25 }} />
      </div>
    </div>
  );
};

export default PageToggler;
