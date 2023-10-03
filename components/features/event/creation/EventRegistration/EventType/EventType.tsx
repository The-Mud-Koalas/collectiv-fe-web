import React from "react";
import EventCollapsible from "../EventCollapsible";
import { inter } from "@/utils/constants/fonts";
import { useEventCreationContext } from "@/context/event/EventCreationContext";
import EventTypeChoice from "./EventTypeChoice";
import EventTypeCard from "./EventTypeCard";

interface Props {
  currentStage?: number;
  openRegisStage: () => void;
  closeStage: () => void;
}

const EVENT_DESCRIPTION = [
  "Our community space comes with two types of hosting event. You may host your event as a ",
  "service initiative",
  " or a ",
  "project.",
];

const SERVICE_INITIATIVES = {
  title: "Service Initiatives",
  description:
    "Promote an inclusive and respectful atmosphere and encourage attendees to be mindful of different beliefs.",
};

const COMMUNITY_PROJECTS = {
  title: "Community Projects",
  description:
    "Promote an inclusive and respectful atmosphere and encourage attendees to be mindful of different beliefs.",
};

const EventType: React.FC<Props> = ({
  currentStage,
  openRegisStage,
  closeStage,
}) => {
  const { isProject, changeIsProject } = useEventCreationContext();

  const chosenType = isProject ? COMMUNITY_PROJECTS : SERVICE_INITIATIVES;

  return (
    <EventCollapsible
      isCollapsibleEnabled
      sectionId="event-type"
      sectionTitle="Event Type"
      description={EVENT_DESCRIPTION}
      childrenIfCollapsed={
        currentStage != null ? <EventTypeCard {...chosenType} /> : <></>
      }
      isOpened={currentStage === 1}
      openCollapsible={openRegisStage}
      closeCollapsible={closeStage}
    >
      <div className="flex flex-col gap-3 w-full">
        <h3 className={`${inter.className} font-semibold text-lg sm:text-2xl`}>
          I host this event as:
        </h3>
        <EventTypeChoice
          {...SERVICE_INITIATIVES}
          clickHandler={changeIsProject(false)}
          selectedWhen={!isProject}
        />
        <EventTypeChoice
          {...COMMUNITY_PROJECTS}
          clickHandler={changeIsProject(true)}
          selectedWhen={isProject}
        />
      </div>
    </EventCollapsible>
  );
};

export default EventType;
