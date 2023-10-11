import { Button, Modal } from "@/components/shared/elements";
import { useAppContext } from "@/context/AppContext";
import { auth } from "@/lib/firebase";
import React, { useEffect, useState } from "react";
import VolunteerAttendanceModal from "../event/attendance/VolunteerAttendanceModal";

const Home = () => {
  const { sendMessageToRN } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <div>Home</div> */}
      <Modal open={showModal}>
        <VolunteerAttendanceModal
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
