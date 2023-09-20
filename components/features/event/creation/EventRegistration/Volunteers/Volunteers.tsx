import { inter } from '@/utils/constants/fonts'
import React from 'react'
import EventCollapsible from '../EventCollapsible';

interface Props {
    currentStage?: number;
    openRegisStage: () => void;
    closeStage: () => void;
  }

const VOLUNTEERS_DESCRIPTION = [
    "Planning an event that could use some extra helping hands? Complete this section to match your event with the ",
    "perfect volunteers",
    " who share your vision and passion."
]

const Volunteers: React.FC<Props> = ({
  closeStage,
  openRegisStage,
  currentStage,
}) => {
  return (
    <EventCollapsible
      isCollapsibleEnabled
      sectionId="volunteers"
      sectionTitle="Volunteers"
      description={VOLUNTEERS_DESCRIPTION}
      isOpened={currentStage === 1}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
      
    </EventCollapsible>
  )
}

export default Volunteers