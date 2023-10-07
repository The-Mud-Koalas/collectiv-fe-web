import React from "react";
import EventCard from "./EventCard";

interface Props {
  filters: EventFilters;
  fetchType: "event" | "location"
}

const EventList: React.FC<Props> = ({ filters, fetchType }) => {
  const data: ServiceEvent[] = [
    {
      id: "7f28cd70-17c7-4a7d-9ba1-002b44fb0208",
      name: "New Project for Testing",
      description: "Project Description",
      min_num_of_volunteers: 0,
      status: "Scheduled",
      event_type: "project",
      event_location: {
        id: "04b6db13-1f13-4b36-9c28-82177aef6cf6",
        name: "UQ Modwest",
        latitude: 10.0,
        longitude: -180.0,
      },
      event_category: {
        id: "0bdd3c01-4405-4f69-9762-495ce88cad9b",
        name: "cultural event",
      },
      event_creator_id: "biFTRAa0l3feR4qvr6A7woI40vG2",
      event_start_date_time: "2023-12-23T10:10:00+00:00",
      event_end_date_time: "2023-12-24T11:30:00+00:00",
      event_tags: [
        {
          id: "f371bce0-98bf-4b29-8e29-5822a7169304",
          name: "go-green",
        },
      ],
      goal: 123.0,
      measurement_unit: "baloons",
      progress: 0.0,
      transactions: [],
    },
  ];
  
  return (
    <section id="event-list" className="flex flex-wrap w-full px-10 my-2">
      {data.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
};

export default EventList;
