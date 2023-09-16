import React, { createContext, useContext, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";

interface EventCreationFields {
  name: string;
  description?: string;
  is_project: boolean;
  project_goal?: number;
  goal_measurement_unit?: string;
  min_num_of_volunteers: number;
  start_date_time: string;
  end_date_time: string;
  location_id: string;
  tags: string[];
}

interface EventContextProps {
  form: UseFormReturn<EventCreationFields>;
  stage: number;
  changeStage: (newStage: number) => () => void;
  visitedStage: number[];
}

const EventCreationContext = createContext<EventContextProps>(
  {} as EventContextProps
);

const useEventCreationContext = () => useContext(EventCreationContext);

const EventCreationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const form = useForm<EventCreationFields>();
  const [stage, setStage] = useState(0);
  const [visitedStage, setVisitedStage] = useState<number[]>([0]);

  const changeStage = (newStage: number) => () => {
    setStage(newStage);

    const visitedSet = new Set(visitedStage).add(newStage);
    setVisitedStage([...visitedSet]);
  }

  return (
    <EventCreationContext.Provider value={{ form, stage, changeStage, visitedStage }}>
      {children}
    </EventCreationContext.Provider>
  );
};

export { EventCreationProvider, useEventCreationContext };