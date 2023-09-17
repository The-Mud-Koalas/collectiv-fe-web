import { Loading } from "@/components/shared/layouts";
import { getServiceCategories } from "@/utils/fetchers/event/creation";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Options } from "react-select";

interface EventCreationFields {
  name: string;
  category: string;
  description?: string;
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
  isProject: boolean;
  changeStage: (newStage: number) => () => void;
  changeIsProject: (newIsProject: boolean) => () => void;
  visitedStage: number[];
  categories: CategoryOptions[]
}

const EventCreationContext = createContext<EventContextProps>(
  {} as EventContextProps
);

const useEventCreationContext = () => useContext(EventCreationContext);

const EventCreationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const form = useForm<EventCreationFields>();
  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getServiceCategories,
    staleTime: Infinity
  })
  const [isProject, setIsProject] = useState(false);
  const [stage, setStage] = useState(0);
  const [visitedStage, setVisitedStage] = useState<number[]>([0]);

  const changeStage = (newStage: number) => () => {
    setStage(newStage);

    const visitedSet = new Set(visitedStage).add(newStage);
    setVisitedStage([...visitedSet]);
  }

  const changeIsProject = (newIsProject: boolean) => () => setIsProject(newIsProject);

  if (isLoading) return <Loading/>;
  if (isError) return <></>;

  return (
    <EventCreationContext.Provider value={{ isProject, changeIsProject, form, stage, changeStage, visitedStage, categories }}>
      {children}
    </EventCreationContext.Provider>
  );
};

export { EventCreationProvider, useEventCreationContext };
