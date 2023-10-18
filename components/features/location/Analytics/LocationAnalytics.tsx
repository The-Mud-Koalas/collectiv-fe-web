import { getRequest } from "@/lib/fetch";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  FaArrowsDownToPeople,
  FaFaceFrown,
  FaFaceGrin,
  FaFaceMeh,
} from "react-icons/fa6";
import {
  BarChart,
  ChartContainer,
  StatisticCard,
} from "../../event/dashboard/dataviz";
import { garamond } from "@/utils/constants/fonts";
import { BeatLoader } from "react-spinners";
import { COLORS } from "@/utils/constants/colors";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import cn from "clsx";
import PieChart from "../../event/dashboard/dataviz/PieChart";

interface Props {
  locationId: string;
}

const LocationAnalytics = ({ locationId }: Props) => {
  const participationData = useQuery({
    queryKey: ["location-participation-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/participation-count/${locationId}`,
      })) as LocationParticipationData;
    },
  });
  const projectGoalsData = useQuery({
    queryKey: ["location-project-goals-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/project-contributions/${locationId}`,
      })) as LocationProjectGoalsData;
    },
  });
  const ratingData = useQuery({
    queryKey: ["location-rating-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-ratings/${locationId}`,
      })) as LocationRatingData;
    },
  });
  const sentimentData = useQuery({
    queryKey: ["location-sentiment-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-sentiments/${locationId}`,
      })) as LocationSentimentData;
    },
  });
  const eventData = useQuery({
    queryKey: ["location-event-data", locationId],
    queryFn: async () => {
      return (await getRequest({
        endpoint: `/analytics/space/event-counts/${locationId}`,
      })) as LocationEventData;
    },
  });

  const sentimentScore = sentimentData.data?.average_sentiment_score
    ? sentimentData.data.average_sentiment_score * 100
    : 0;

  let sentimentIcon = <FaFaceFrown className="text-danger-300" />;

  if (sentimentScore < 80 && sentimentScore >= 50) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  } else if (sentimentScore > 80) {
    sentimentIcon = <FaFaceGrin className="text-primary-400" />;
  }

  const noSentimentYet = sentimentData.data?.average_sentiment_score == null;

  if (noSentimentYet) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  }

  const noRatingYet =
    !ratingData.data || ratingData.data.average_rating == null;

  let ratingIcon = <BsStar className="text-danger-200" />;

  if (
    ratingData.data &&
    ratingData.data.average_rating > 2 &&
    ratingData.data.average_rating < 4
  ) {
    ratingIcon = <BsStarHalf className="text-gray-300" />;
  } else if (ratingData.data && ratingData.data.average_rating > 4) {
    ratingIcon = <BsStarFill className="text-orange-300" />;
  }

  let totalUsers = 0;

  if (participationData.data) {
    const data = participationData.data.participation_data;
    totalUsers =
      data.contributors_in_location +
      data.participants_in_location +
      data.volunteers_count_in_location;
  }

  const showcasedGoals = useMemo(() => {
    if (!projectGoalsData.data) return [];
    const sorted = projectGoalsData.data.contribution_data
      .slice()
      .sort((a, b) => b.total_contribution - a.total_contribution);
    const topTen = sorted.slice(0, 10);
    const mappedForPieChart = topTen.map((goal) => ({
      id: `Amount of ${goal.goal_kind} (${goal.measurement_unit}) donated`,
      label: `${goal.goal_kind} (${goal.measurement_unit})`,
      value: goal.total_contribution,
    }));

    return mappedForPieChart;
  }, [projectGoalsData.data]);

  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {
          <StatisticCard
            icon={
              sentimentData.isLoading ? (
                <BeatLoader color={COLORS.primary[500]} />
              ) : (
                sentimentIcon
              )
            }
            value={noSentimentYet ? "-" : `${sentimentScore.toFixed(1)}%`}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              Average user sentiment score
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic">
              *how positive user reviews are overall across events in this
              location
            </p>
          </StatisticCard>
        }
        <StatisticCard
          icon={
            ratingData.isLoading ? (
              <BeatLoader color={COLORS.primary[500]} />
            ) : (
              ratingIcon
            )
          }
          value={noRatingYet ? "-" : `${ratingData.data!.average_rating}`}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Average event rating
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *Average of all event ratings across this location
          </p>
        </StatisticCard>
        <StatisticCard
          icon={
            participationData.isLoading ? (
              <BeatLoader color={COLORS.primary[500]} />
            ) : (
              <FaArrowsDownToPeople className={"text-secondary-400"} />
            )
          }
          value={participationData.isLoading ? "-" : `${totalUsers}`}
        >
          <p
            className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
          >
            Collectiv users actively participating
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic">
            *Total participating users (participants/volunteers/contributors) in
            this location across all events
          </p>
        </StatisticCard>
      </div>
      <div className="flex items-center justify-center w-full 2xl:gap-24 gap-12 flex-wrap">
        <ChartContainer>
          <p
            className={cn(
              "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Events in location
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
            *The events in this location grouped by type
          </p>
          <BarChart
            data={
              eventData.data
                ? [
                    {
                      eventType: "total events",
                      "total events":
                        eventData.data.event_count_data
                          .num_of_events_in_location,
                    },
                    {
                      eventType: "initiatives",
                      initiatives:
                        eventData.data.event_count_data
                          .num_of_initiatives_in_location,
                    },
                    {
                      eventType: "projects",
                      projects:
                        eventData.data.event_count_data
                          .num_of_projects_in_location,
                    },
                  ]
                : []
            }
            indexBy="eventType"
            keys={["total events", "initiatives", "projects"]}
          />
        </ChartContainer>
        <ChartContainer>
          <p
            className={cn(
              "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Collectiv active user role demographic
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
            *Currently participating users group by event role
          </p>
          <BarChart
            data={
              participationData.data
                ? [
                    {
                      userType: "contributors",
                      contributors:
                        participationData.data.participation_data
                          .contributors_in_location,
                    },
                    {
                      userType: "volunteers",
                      volunteers:
                        participationData.data.participation_data
                          .volunteers_count_in_location,
                    },
                    {
                      userType: "participants",
                      participants:
                        participationData.data.participation_data
                          .participants_in_location,
                    },
                  ]
                : []
            }
            indexBy="userType"
            keys={["contributors", "volunteers", "participants"]}
          />
        </ChartContainer>
      </div>
      <div className="flex items-center justify-center w-full 2xl:gap-24 gap-12 flex-wrap">
        <div
          className={cn(
            "2xl:w-[600px] w-[min(100%,_500px)] text-primary-700 font-semibold h-fit flex flex-col items-center aspect-video py-2 text-6xl lg:text-7xl xl:text-8xl",
            garamond.className
          )}
        >
          <p className="my-auto">
            Look at what this location has achieved for our community.
          </p>
        </div>
        <ChartContainer>
          <p
            className={cn(
              "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
              garamond.className
            )}
          >
            Projects in location achievement showcase
          </p>
          <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
            *Top 10 past/current project goals by their contribution amount
          </p>
          <PieChart
            data={showcasedGoals}
          />
        </ChartContainer>
      </div>
    </div>
  );
};

export default LocationAnalytics;
