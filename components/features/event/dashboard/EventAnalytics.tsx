import React from "react";
import { garamond, inter } from "@/utils/constants/fonts";
import {
  BarChart,
  ChartContainer,
  GoalMeter,
  LineChart,
  StatisticCard,
} from "./dataviz";
import {
  FaPeopleGroup,
  FaArrowsDownToPeople,
  FaFaceSmile,
  FaFaceFrown,
  FaFaceMeh,
  FaFaceGrin,
} from "react-icons/fa6";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetch";
import { BeatLoader } from "react-spinners";
import { COLORS } from "@/utils/constants/colors";
import cn from "clsx";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidPencil } from "react-icons/bi";
import { Modal } from "@/components/shared/elements";
import UpdateProgressModal from "./UpdateProgressModal";
import ProgressHistoryModal from "./ProgressHistoryModal";

interface Props {
  eventId: string;
  analytics: UseQueryResult<EventAnalytics, unknown>;
}

const EventAnalytics = ({ analytics, eventId}: Props) => {
  const { user } = useAppContext();
  const router = useRouter();
  const BASE_URL = `/event/${eventId}`;

  if (analytics.isLoading || !analytics.data) {
    return (
      <section className="mt-12 flex flex-col items-center">
        <BeatLoader className="mx-auto" color={COLORS.primary[500]} />
      </section>
    );
  }

  const data = analytics.data;

  const sentimentScore = data.average_sentiment_score
    ? data.average_sentiment_score * 100
    : 0;

  let sentimentIcon = <FaFaceFrown className="text-danger-300" />;

  if (sentimentScore < 80 && sentimentScore >= 50) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  } else if (sentimentScore > 80) {
    sentimentIcon = <FaFaceGrin className="text-primary-400" />;
  }

  const noSentimentYet = analytics.data && data.average_sentiment_score == null;

  if (data.average_sentiment_score == null) {
    sentimentIcon = <FaFaceMeh className="text-yellow-600" />;
  }

  const isOwnerOfProject =
    data.event_creator_id === user?.uid && data.event_type === "project";

  return (
    <>
      <section
        className={cn(
          "mt-12 flex flex-col items-center gap-8",
          inter.className
        )}
      >
        <div className="w-full flex flex-col">
          {data.event_type === "project" && (
            <GoalMeter
              currVal={data.progress}
              target={data.goal}
              unit={data.measurement_unit}
            />
          )}
          <div className="self-end flex items-center gap-4">
            {isOwnerOfProject && (
              <Link
                shallow
                scroll={false}
                href={BASE_URL + "?viewProgressHistory=true"}
                className="text-xs lg:text-sm underline text-secondary-500 font-semibold"
              >
                View Progress History
              </Link>
            )}
            {isOwnerOfProject && (
              <Link
                shallow
                scroll={false}
                href={BASE_URL + "?updateProgress=true"}
                className="border-[2px] hover:bg-opacity-10 hover:bg-primary-400 border-primary-700 rounded-full px-4 text-primary-700 flex items-center gap-2 py-1 text-xs lg:text-sm"
              >
                <BiSolidPencil /> Update Goal Progress
              </Link>
            )}
          </div>
        </div>
        <div
          className={`flex flex-wrap items-center gap-8 justify-evenly w-full`}
        >
          <StatisticCard
            value={(
              data.current_num_of_participants + data.current_num_of_volunteers
            ).toString()}
            icon={<FaPeopleGroup className={"text-secondary-400"} />}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              {data.event_type === "initiative" ? (
                <span>Registered Participants</span>
              ) : (
                <span>Contributors</span>
              )}
            </p>
            {
              <p className="lg:text-sm text-xs text-secondary-400 italic">
                {data.event_type === "initiative" ? (
                  <span>*number of registered participants</span>
                ) : (
                  <span>*number of contributors</span>
                )}
              </p>
            }
          </StatisticCard>
          {data.event_type === "initiative" && (
            <StatisticCard
              value={data.number_of_attending_participants.toString()}
              icon={<FaArrowsDownToPeople className={"text-secondary-400"} />}
            >
              <p
                className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
              >
                Attending Participants
              </p>
              <p className="lg:text-sm text-xs text-secondary-400 italic">
                *Number of participants currently at the event
              </p>
            </StatisticCard>
          )}
          <StatisticCard
            icon={sentimentIcon}
            value={noSentimentYet ? "n/a" : `${sentimentScore.toFixed(1)}%`}
          >
            <p
              className={`mt-2 lg:text-3xl text-xl font-medium ${garamond.className}`}
            >
              User review sentiment score
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic">
              *determines how positive user reviews are overall
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
              Number of Participants vs Volunteers registered
            </p>
            <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full pl-5">
              *How many participants are registered compared to how many
              volunteers are registers.
            </p>
            <BarChart
              data={[
                {
                  participantType: "volunteer",
                  volunteers: data.current_num_of_volunteers,
                },
                {
                  participantType: "participant",
                  participant: data.current_num_of_participants,
                },
              ]}
              indexBy="participantType"
              keys={["volunteers", "participant"]}
            />
          </ChartContainer>
          {data.event_type === "initiative" && (
            <ChartContainer>
              <p
                className={cn(
                  "mt-2 lg:text-3xl text-xl font-medium text-left w-full pl-5",
                  garamond.className
                )}
              >
                Participation Registration Days
              </p>
              <p className="lg:text-sm text-xs text-secondary-400 italic text-left w-full px-5">
                *Days where there were participant registration(s) along with
                their count
              </p>
              <LineChart
                data={[
                  {
                    id: "Registration Count:",
                    data: data.registration_history
                      .map((hist) => ({
                        x: new Date(hist.registration_date),
                        y: hist.count,
                      }))
                      .slice(0, 10),
                  },
                ]}
              />
            </ChartContainer>
          )}
        </div>
      </section>
      {isOwnerOfProject && (
        <Modal
          open={router.query.updateProgress === "true"}
          onOverlayTap={() =>
            router.push(BASE_URL, undefined, { shallow: true })
          }
        >
          <UpdateProgressModal
            onClose={() => router.push(BASE_URL, undefined, { shallow: true })}
            eventDetails={data}
          />
        </Modal>
      )}
      {isOwnerOfProject && (
        <Modal
          open={router.query.viewProgressHistory === "true"}
          onOverlayTap={() =>
            router.push(BASE_URL, undefined, { shallow: true })
          }
        >
          <ProgressHistoryModal
            eventDetails={data}
            onClose={() => router.push(BASE_URL, undefined, { shallow: true })}
          />
        </Modal>
      )}
    </>
  );
};

export default EventAnalytics;
