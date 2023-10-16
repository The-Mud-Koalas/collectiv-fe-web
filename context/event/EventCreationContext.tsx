import { Loading } from "@/components/shared/layouts";
import { getLocations, getProjectUnitGoals, getServiceCategories, getTags } from "@/utils/fetchers/event/creation";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
interface EventContextProps {
  eventDetailsForm: UseFormReturn<EventCreationFields>;
  stage: number;
  isProject: boolean | null;
  changeStage: (newStage: number) => () => void;
  changeIsProject: (newIsProject: boolean) => () => void;
  populateFormValues: (event: NewEventFields) => void;
  visitedStage: number[];
  categories: Category[];
  locations: EventLocation[];
  tags: Tag[];
  goalKind: GoalKind[];
}

const EventCreationContext = createContext<EventContextProps>(
  {} as EventContextProps
);

const useEventCreationContext = () => useContext(EventCreationContext);

const EventCreationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const eventDetailsForm = useForm<EventCreationFields>();

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getServiceCategories,
    staleTime: Infinity,
  });

  const {
    data: locations,
    isLoading: isLocationLoading,
    isError: isLocationError
  } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocations
  });

  const {
    data: tags,
    isLoading: isTagsLoading,
    isError: isTagsError
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags
  });

  const {
    data: goalKind,
    isLoading: isGoalKindLoading,
    isError: isGoalKindError
  } = useQuery({
    queryKey: ["goal-kind"],
    queryFn: getProjectUnitGoals
  })

  const isLoading = isCategoriesLoading || isLocationLoading || isTagsLoading;
  const isError = isCategoriesError || isLocationError || isTagsError

  const [isProject, setIsProject] = useState<boolean | null>(null);
  const [stage, setStage] = useState(0);
  const [visitedStage, setVisitedStage] = useState<number[]>([0]);

  const changeStage = (newStage: number) => () => {
    setStage(newStage);

    const visitedSet = new Set(visitedStage).add(newStage);
    setVisitedStage([...visitedSet]);
  };

  const changeIsProject = (newIsProject: boolean) => () =>
    setIsProject(newIsProject);

  const populateFormValues = (event: NewEventFields) => {
    const {eventValues, isProject} = event;
    
    const eventKeys = Object.keys(eventValues);

    eventKeys.forEach((key) => {
      const eventKey = key as keyof EventCreationFields;
      eventDetailsForm.setValue(eventKey, eventValues[eventKey]);
    });

    setIsProject(isProject);
  }

  if (isCategoriesLoading || isLocationLoading || isTagsLoading || isGoalKindLoading) return <Loading />;
  if (isCategoriesError || isLocationError || isTagsError || isGoalKindError) return <></>;

  return (
    <EventCreationContext.Provider
      value={{
        isProject,
        changeIsProject,
        eventDetailsForm,
        stage,
        changeStage,
        visitedStage,
        categories,
        locations,
        populateFormValues,
        tags,
        goalKind
      }}
    >
      {children}
    </EventCreationContext.Provider>
  );
};

export { EventCreationProvider, useEventCreationContext };
