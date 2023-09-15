import EventCreation from '@/components/features/event/creation/EventCreation';
import { Template } from '@/components/shared/layouts';
import { EventCreationProvider } from '@/context/event/EventCreationContext';
import React from 'react'

const EventCreationPage = () => {
  return (
    <Template>
        <EventCreationProvider>
            <EventCreation/>
        </EventCreationProvider>
    </Template>
  )
}

EventCreationPage.auth = true;

export default EventCreationPage