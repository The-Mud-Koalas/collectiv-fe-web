import { Modal, Card, Button } from "@/components/shared/elements";
import Cross from "@/components/shared/svg/icons/Cross";
import { COLORS } from "@/utils/constants/colors";
import { inter, garamond } from "@/utils/constants/fonts";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
}

const LocationModal: React.FC<Props> = ({ showModal, setShowModal, onAccept }) => {
  const [disallow, setDisallow] = useState(false);

  return (
    <Modal open={showModal} onOverlayTap={() => setShowModal(false)}>
      <Card className="relative w-80 bg-tertiary-100">
        <Button
          className="absolute right-4 top-2"
          onClick={() => setShowModal(false)}
        >
          <Cross color={COLORS.primary[800]} dimensions={{ width: 20 }} />
        </Button>

        <AnimatePresence mode="popLayout">
          {!disallow ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="mt-6 flex flex-col items-center gap-2">
                <h1 className={`${inter.className} font-medium text-xl text-center`}>
                  <span className={`${garamond.className} font-bold text-2xl`}>
                    Collectiv
                  </span>{" "}
                  would like to access your location
                </h1>
                <p
                  className={`${inter.className} text-center text-sm w-fit`}
                >
                  By allowing location access, you can receive details about
                  upcoming events whenever you enter our event locations.
                </p>
              </div>
              <div className="flex w-full justify-between items-center  mt-3">
                <Button
                  className={`${inter.className} rounded-lg bg-danger-500 px-2 py-1 w-[15ch] text-sm text-white`}
                  onClick={() => setDisallow(true)}
                >
                  Don&apos;t Allow
                </Button>
                <Button
                    onClick={onAccept}
                    className={`${inter.className} rounded-lg bg-primary-800 px-2 py-1 w-[15ch] text-sm text-primary-300`}
                >
                  Allow
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="mt-6 flex flex-col w-full justify-between items-center gap-3"
              key="exiting"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <h1 className={`${inter.className} font-medium text-xl`}>
                Location access disabled
              </h1>
              <p
                className={`${inter.className} text-center text-sm w-fit`}
              >
                If you ever wished to discover events as you go, you can still
                enable location-based discovery through your settings.
              </p>
              <Button
                onClick={() => setShowModal(false)}
                className={`${inter.className} mt-2 rounded-lg bg-primary-800 px-2 py-1 w-[15ch] text-sm text-primary-300`}
              >
                Got it
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </Modal>
  );
};

export default LocationModal;
