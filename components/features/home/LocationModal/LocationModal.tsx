import { Modal, Card, Button } from "@/components/shared/elements";
import Cross from "@/components/shared/svg/icons/Cross";
import LocationRed from "@/components/shared/svg/icons/LocationRed";
import { postRequest } from "@/lib/fetch";
import { auth } from "@/lib/firebase";
import { COLORS } from "@/utils/constants/colors";
import { inter, garamond } from "@/utils/constants/fonts";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAccept: () => void;
}

const LocationModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  onAccept,
}) => {
  const [disallow, setDisallow] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async () => {
      const token = await auth.currentUser?.getIdToken();
      const endpoint = "/user/location-prompt-status/update";
      const body = {
        has_been_prompted: true,
      };
      await postRequest({ endpoint, body, token: token });
    },
  });

  const closeModal = async () => {
    setShowModal(false);
    await mutateAsync();
  };

  return (
    <Modal open={showModal} onOverlayTap={closeModal}>
      <div
        style={{ width: "min(90vw, 600px)" }}
        className={`${inter.className} relative rounded-2xl bg-white px-8 py-6`}
      >
        <Button className="absolute right-4 top-2" onClick={closeModal}>
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
                <LocationRed />
                <h1
                  className={`${garamond.className} text-primary-900 text-4xl mb-5 text-center`}
                >
                  Collectiv would like to access your location
                </h1>
                <p className="text-sm lg:text-base font-normal">
                  By allowing location access, you can receive details about
                  upcoming events whenever you enter our event locations.
                </p>
              </div>
              <div className="w-full flex gap-3 px-10 mt-5">
                <Button
                  onClick={() => setDisallow(true)}
                  type="button"
                  className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
                >
                  Don&apos;t Allow
                </Button>
                <Button
                  onClick={() => {
                    onAccept();
                    closeModal();
                  }}
                  className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300"
                >
                  Check Out
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
              <p className={`${inter.className} text-center text-sm w-fit`}>
                If you ever wished to discover events as you go, you can still
                enable location-based discovery through your settings.
              </p>
              <Button
                onClick={closeModal}
                className={`${inter.className} mt-2 rounded-lg bg-primary-800 px-2 py-1 w-[15ch] text-sm text-primary-300`}
              >
                Got it
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
};

export default LocationModal;
