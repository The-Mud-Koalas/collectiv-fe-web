import { useAppContext } from "@/context/AppContext";
import { inter } from "@/utils/constants/fonts";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import QRCode from "react-qr-code";

interface Props {
  eventId: string;
  onClose: () => void;
}

// queryKey: ["current-event"]

const ParticipantQRModal: React.FC<Props> = ({ eventId, onClose }) => {
  const { user } = useAppContext();

  if (user == null) return <></>

  return (
    <div
      style={{ width: "min(90vw, 600px)" }}
      className={`${inter.className} flex flex-col gap-2 relative rounded-2xl bg-white px-8 py-6`}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
      <h1 className="font-semibold text-3xl">Your Attendance QR</h1>
      <p className="text-sm lg:text-base font-normal">Show this QR code to your event organizer to be scanned.</p>
      
      <QRCode className="w-full mt-4" value={user.phoneNumber ?? user.email!}/>
    </div>
  );
};

export default ParticipantQRModal;
