import { Template } from '@/components/shared/layouts'
import { CurrentPastFutureEvents } from '@/components/shared/layouts/CurrentPastFutureEvents'
import React from 'react'

const RegisteredEventsPage = () => {
  return (
    <Template>
      <CurrentPastFutureEvents type="registered" />
    </Template>
  )
}

export default RegisteredEventsPage