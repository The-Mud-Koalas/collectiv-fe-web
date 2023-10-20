import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useQuery } from "@tanstack/react-query";
import { getListOfEvents } from "@/utils/fetchers/event/discovery";
import { Loading } from "../../layouts";
import PageToggler from "./PageToggler";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  filters: EventFilters | Omit<EventFilters, "location">;
  fetchType: "event" | "location";
  location?: EventLocation;
}

const EventList: React.FC<Props> = ({ filters, fetchType, location }) => {
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState<number | null>(null);
  const { data, isLoading, isError, error, isPreviousData } = useQuery<
    PaginatedResults<EventDetail[]>
  >({
    queryFn: fetchType === "event" ? () => getListOfEvents(filters)(page) : () => getListOfEvents(filters as LocationFilters, location)(page),
    queryKey: ["event", page, filters],
    keepPreviousData: true,
  });

  useEffect(() => {
    console.log(data)
    if (data != null) {
      setNoOfPages(data.total_pages);
    }
  }, [data, noOfPages]);

  useEffect(() => {
    setPage(1);
  }, [filters])

  const handlePageChange = (page: number) => () => setPage(page);

  // if (isLoading) return <Loading />;
  if (isError) return <></>;

  return (
    <section id="event-list" className="w-full">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex justify-center gap-6 flex-wrap w-full px-4 md:px-6 my-2 self-center">
          <AnimatePresence mode="popLayout">
            {data.results.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={event.id}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <PageToggler
        changePage={handlePageChange}
        noOfPages={noOfPages}
        currentPage={page}
        prev={data?.previous}
        next={data?.next}
      />
    </section>
  );
};

export default EventList;
