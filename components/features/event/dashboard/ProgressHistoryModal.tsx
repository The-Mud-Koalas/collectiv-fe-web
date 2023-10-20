import React, { useState } from "react";
import cn from "clsx";
import { inter } from "@/utils/constants/fonts";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

interface Props {
  eventDetails: ProjectAnalytics;
  onClose: () => void;
}

const ProgressHistoryModal = ({ eventDetails, onClose }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const contributionsPerPage = 5;
  const maxPages = Math.max(
    0,
    Math.ceil(eventDetails.transactions.length / 5) - 1
  );
  const startIndex = Math.min(currentPage, maxPages) * contributionsPerPage;
  const endIndex = startIndex + contributionsPerPage;

  return (
    <div
      style={{ width: "min(95vw, 600px)" }}
      className="rounded-md bg-white p-8 flex flex-col items-center gap-4 relative"
    >
      <p className={cn(inter.className, "text-3xl font-bold self-start")}>
        Progress History
      </p>
      <div className="w-full">
        <table className="table-auto w-full text-xs lg:text-sm">
          <thead>
            <tr>
              <th className="border-b border-black font-medium p-2 text-gray-400 pb-2 lg:p-4 lg:pb-3 text-center w-1/2">
                Contribution Amount ({eventDetails.measurement_unit})
              </th>
              <th className="border-b border-black font-medium rounded-tr-md text-gray-400 p-2 pb-2 lg:p-4 lg:pb-3 text-center w-1/2">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody>
            {eventDetails.transactions
              .slice(startIndex, endIndex)
              .map((transaction) => (
                <tr key={transaction.timestamp}>
                  <td className="p-2 lg:p-4 text-slate-500 text-center font-bold">
                    {transaction.contribution}
                  </td>
                  <td className="p-2 lg:p-4 text-slate-500 text-center">
                    {new Date(transaction.timestamp).toDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex items-center gap-2 justify-end mt-2 lg:text-sm text-xs">
          <button
            className="hover:bg-gray-200 p-1 rounded-md"
            onClick={() => {
              if (currentPage === 0) return;
              setCurrentPage(currentPage - 1);
            }}
          >
            <AiOutlineArrowLeft className="text-base lg:text-lg" />
          </button>
          <span className="text-gray-500 italic">
            Page {currentPage + 1} of {maxPages + 1}
          </span>
          <button
            className="hover:bg-gray-200 p-1 rounded-md"
            onClick={() => {
              if (currentPage === maxPages) return;
              setCurrentPage(currentPage + 1);
            }}
          >
            <AiOutlineArrowRight className="text-base lg:text-lg" />
          </button>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default ProgressHistoryModal;
