import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import cn from "clsx"

interface ModalProps extends React.PropsWithChildren {
  open: boolean;
  onOverlayTap?: () => void;
}

const Modal = ({ children, open, onOverlayTap }: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onTap={onOverlayTap}
            className={cn("z-[999] bg-slate-500 fixed top-0 left-0 w-screen h-screen", onOverlayTap && "cursor-pointer")}
          />
          <motion.div
            style={{ top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ y: { ease: "linear", duration: .15 } }}
            className="z-[1000] fixed"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
