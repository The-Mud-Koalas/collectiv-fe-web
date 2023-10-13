import { Filter } from "@/components/shared/elements/Filter";
import { garamond, inter } from "@/utils/constants/fonts";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import AssistedCheckinForm from "./AssistedCheckinForm";
import { PillSelector } from "@/components/shared/elements/PillSelector";
import { AnimatePresence, motion } from "framer-motion";
import QRScanner from "./QRScanner";
import { Button } from "@/components/shared/elements";
import { RxCross2 } from "react-icons/rx";

interface Props {
  eventId: string;
  onCheckInComplete: () => void;
  onClose: () => void;
}

type SelectParticipantOption = SelectOption<"Participant" | "Volunteer">;

const values = ["Participant", "Volunteer"];
const checkInTypes = ["Input manual data", "Scan QR code"];

const AttendanceModal: React.FC<Props> = ({
  eventId,
  onCheckInComplete,
  onClose,
}) => {
  const searchParams = useSearchParams();
  const [type, setType] = useState<SelectParticipantOption>({
    label: "Participant",
    value: "Participant",
  });
  const [checkInTypeIdx, setCheckInTypeIdx] = useState(0);
  const changeCheckInTypeIdx = (idx: number) => () => setCheckInTypeIdx(idx);
  const userIdfier = searchParams.get("userIdentifier");

  return (
    <motion.div
      style={{ width: "min(90vw, 600px)" }}
      className={`${inter.className} relative rounded-2xl bg-white px-8 py-6`}
    >
      {userIdfier == null ? (
        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
          >
            <RxCross2 />
          </button>
          <div className="w-fit">
            <Filter
              onChange={(value) => setType(value as SelectParticipantOption)}
              isClearable={false}
              filterName=""
              firstDefault
              filterOptions={values.map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </div>
          <h1 className="font-semibold text-3xl">Arrival Check-In</h1>
          <p className="text-sm lg:text-base font-normal">
            Record check-in by inputting user information manually or scanning
            their QR code.
          </p>
          <PillSelector
            choices={checkInTypes}
            changeIdx={changeCheckInTypeIdx}
            currentIdx={checkInTypeIdx}
          />
          <AnimatePresence mode="popLayout">
            {checkInTypeIdx === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="form-ci"
              >
                <AssistedCheckinForm
                  type={type}
                  onClose={onClose}
                  eventId={eventId}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="qr"
              >
                <QRScanner
                  key="qr"
                  closeModal={onClose}
                  eventId={eventId}
                  type={type}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="28"
              cy="28"
              r="26.5"
              fill="#BAF67E"
              stroke="#163300"
              stroke-width="3"
            />
            <path
              d="M37.9551 20.5332L24.2662 34.2221L18.0439 27.9999"
              stroke="#163300"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <h1 className={`${garamond.className} font-normal text-4xl`}>
            Check In Successful
          </h1>
          <Button
            onClick={onClose}
            className="self-center bg-primary-800 text-primary-300 font-medium items-center px-20 rounded-full gap-4 py-2 text-base w-fit justify-center flex"
          >
            Close
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default AttendanceModal;
