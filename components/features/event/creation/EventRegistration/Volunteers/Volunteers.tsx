import { inter } from '@/utils/constants/fonts'
import React from 'react'
import EventCollapsible from '../EventCollapsible';

interface Props {
    currentStage?: number;
    openRegisStage: () => void;
    closeStage: () => void;
    visitedStages: React.MutableRefObject<Set<number>>;
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
  visitedStages
}) => {
  return (
    <EventCollapsible
      isCollapsibleEnabled={Math.max(...visitedStages.current) + 1 >= 3}
      sectionId="volunteers"
      sectionTitle="Volunteers"
      description={VOLUNTEERS_DESCRIPTION}
      isOpened={currentStage === 3}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
        <p>Totem Poles</p>
    </EventCollapsible>
  )
}

export default Volunteers