import { Button } from "@/components/shared/elements";
import { Filter } from "@/components/shared/elements/Filter";
import { TextInputField } from "@/components/shared/forms";
import { inter } from "@/utils/constants/fonts";
import { EMAIL_REGEX } from "@/utils/constants/regex";
import { phoneOrEmailValidator } from "@/utils/helpers/validator/phoneOrEmailValidator";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AssistedCheckinForm from "./AssistedCheckinForm";
import { PillSelector } from "@/components/shared/elements/PillSelector";
import { AnimatePresence, motion } from "framer-motion";
import QRScanner from "./QRScanner";

interface Props {
  eventId: string;
  onCheckInComplete: () => void;
  onClose: () => void;
}

interface ParticipationProps {
  emailOrPhoneNumber: string;
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
      className={`${inter.className} rounded-2xl bg-white w-full h-1/2 px-8 py-6`}
    >
      {userIdfier == null ? (
        <div className="flex flex-col gap-3">
          <div className="w-fit self-end">
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
          <h1 className="font-semibold text-4xl">Arrival Check-In</h1>
          <p className="text-lg font-normal">
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
                <QRScanner key="qr" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div>
          <h1>{userIdfier}</h1>
        </div>
      )}
    </motion.div>
  );
};

export default AttendanceModal;
