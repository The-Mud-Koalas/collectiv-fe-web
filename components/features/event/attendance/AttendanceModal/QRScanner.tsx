import { Button } from "@/components/shared/elements";
import { Arrow } from "@/components/shared/svg/icons";
import { useAppContext } from "@/context/AppContext";
import { COLORS } from "@/utils/constants/colors";
import { motion } from "framer-motion";
import React from "react";

interface Props {
  closeModal: () => void;
  eventId: string;
  type: SelectOption<"Participant" | "Volunteer">;
}

const QRScanner: React.FC<Props> = ({ closeModal, eventId, type }) => {
  const { isInRN, sendMessageToRN } = useAppContext();

  const checkInData = {
    event_id: eventId,
    participation_type: type.value
  };

  const openNativeQRScanner = () => sendMessageToRN({ type: "open-qr-scanner", checkInData })
  
  return (
    <motion.div className="my-4 flex flex-col gap-4">
      {isInRN() ? (
        <>
          <p>
            Please request participants to provide their event QR code. Once
            scanned, the user will be promptly checked in.
          </p>
          <Button onClick={openNativeQRScanner} className="self-center bg-primary-800 text-primary-300 font-medium items-center px-8 rounded-full gap-4 py-2 text-base w-fit flex">
            <p>Scan QR</p>
            <div className="-rotate-45">
              <Arrow color={COLORS.primary[300]} dimensions={{ width: 25 }} />
            </div>
          </Button>
        </>
      ) : (
        <>
          <p>
            Unfortunately, QR code scanning is only supported through the Collectiv app.
          </p>
          <Button
          onClick={closeModal}
          type="button"
          className="self-center font-medium items-center px-8 rounded-full gap-4 py-2 text-base w-fit flex border-2"
        >
          Cancel
        </Button>
        </>
      )}
    </motion.div>
  );
};

export default QRScanner;
