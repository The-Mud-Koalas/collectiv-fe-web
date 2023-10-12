import { AttendanceModal } from '@/components/features/event/attendance/AttendanceModal';
import { Modal, Button } from '@/components/shared/elements';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const TestingPage = () => {
    const { sendMessageToRN } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    return (
      <>
        {/* <div>Home</div> */}
        <Modal open={showModal}>
          <AttendanceModal
            eventId={router.query.id as string}
            onCheckInComplete={() => console.log("Check in complete")}
            onClose={() => setShowModal(false)}
          />
        </Modal>
        <Button onClick={() => setShowModal(true)}>Show mOdal</Button>
      </>
    );
}

export default TestingPage