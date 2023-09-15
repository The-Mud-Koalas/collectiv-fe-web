import { useEventCreationContext } from '@/context/event/EventCreationContext'
import React, { useState } from 'react'
import StageToggler from './StageToggler';
import Guidelines from '../Guidelines';
import EventRegistration from '../EventRegistration';
import EventCreated from '../EventCreated';

const EVENT_CREATION_STAGES: EventCreationStages[] = [
  {
    name: "Guidelines",
    StageComponent: Guidelines
  },
  {
    name: "Event Registration",
    StageComponent: EventRegistration
  },
  {
    name: "Event Created",
    StageComponent: EventCreated
  }
]

const EventCreation = () => {
    const { stage } = useEventCreationContext();
    const currentStage = EVENT_CREATION_STAGES[stage];
  return (
    <div className="px-4 py-7 flex flex-col items-center">
      <StageToggler stages={EVENT_CREATION_STAGES}/>
      
      <currentStage.StageComponent/>
    </div>
  )
}

export default EventCreation