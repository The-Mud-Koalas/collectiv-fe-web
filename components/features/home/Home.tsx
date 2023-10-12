import { Button, Modal } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/lib/firebase";
import React, { useEffect, useState } from "react";
import { AttendanceModal } from "../event/attendance/AttendanceModal";

const Home = () => {
  const { sendMessageToRN } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div>Home</div> */}
      <Modal open={showModal}>
        <AttendanceModal
          eventId="1234"
          onCheckInComplete={() => console.log("Check in complete")}
          onClose={() => setShowModal(false)}
        />
      </Modal>
      <Button onClick={() => setShowModal(true)}>Show mOdal</Button>
    </>
  );
};

export default Home;
