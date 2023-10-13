import React from "react";
import Image from "next/image";
import cn from "clsx";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { SlNote } from "react-icons/sl";
import { GrUserManager } from "react-icons/gr";
import { BiExit } from "react-icons/bi";
import {
  BsPersonCheckFill,
  BsPersonFillSlash,
  BsQrCodeScan,
} from "react-icons/bs";
import { useAppContext } from "@/context/AppContext";
import { getRequest, postRequest } from "@/lib/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "@/components/shared/elements";
import { getParticipation } from "@/utils/fetchers/event/participation";
import RecordContributionModal from "../contribution";
import ViewVolunteersModal from "./ViewVolunteersModal";
import { AttendanceModal } from "../attendance/AttendanceModal";
import ParticipantQRModal from "../attendance/ParticipantQRModal";
import { ReviewModal } from "../attendance/ReviewModal";

interface Props {
  eventDetails: EventDetail;
}

const EventInfoAndActions = ({ eventDetails }: Props) => {
  const BASE_URL = `/event/${eventDetails.id}`;

  const { user } = useAppContext();
  const router = useRouter();

  const queryClient = useQueryClient();

  const currentEvent = useQuery({
    queryKey: ["current-event"],
    queryFn: async () => {
      if (!user) return null;
      const token = await user.getIdToken();
      const response = await getRequest({
        endpoint: `/user/current-event`,
        token,
      });
      return response;
    },
  });

  const participation = useQuery({
    queryKey: ["participation", user?.uid, eventDetails.id],
    queryFn: getParticipation(user, eventDetails.id),
    enabled: !!user?.uid,
  });

  const registerParticipant = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        endpoint: "/participation/participant/register",
        token,
        body: {
          event_id: eventDetails.id,
        },
      });
    },
  });
  const registerVolunteer = useMutation({
    mutationFn: async () => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        endpoint: "/participation/volunteer/register",
        token,
        body: {
          event_id: eventDetails.id,
        },
      });
    },
  });

  const handleRegisterAsParticipant = async () => {
    if (!user) return;
    await registerParticipant.mutateAsync();
    queryClient.invalidateQueries({
      queryKey: ["participation", user.uid, eventDetails.id],
    });
    // toast here
  };

  const handleRegisterAsVolunteer = async () => {
    if (!user) return;
    await registerVolunteer.mutateAsync();
    queryClient.invalidateQueries({
      queryKey: ["participation", user.uid, eventDetails.id],
    });
    // toast here
  };

  const closeModal = () => {
    router.push(BASE_URL, undefined, { shallow: true });
  };

  const isParticipant =
    eventDetails.event_type === "initiative" &&
    participation.data?.is_registered &&
    participation.data.data.type === "participant";
  const isVolunteer =
    participation.data?.is_registered &&
    participation.data.data.type === "volunteer";
  const isManager =
    participation.data?.is_registered &&
    participation.data.data.type === "volunteer" &&
    participation.data.data.granted_manager_access;
  const isManagerInInitiative =
    eventDetails.event_type === "initiative" && isManager;
  const isManagerInProject = eventDetails.event_type === "project" && isManager;
  const canCheckOut =
    eventDetails.id === currentEvent.data?.id &&
    (isParticipant || isVolunteer) &&
    eventDetails.status === "Ongoing";
  const canCheckIn =
    (isParticipant || isVolunteer) &&
    !currentEvent.data.is_currently_attending_event &&
    eventDetails.status === "Ongoing";

  return (
    <>
      <section className="flex gap-6 mt-5 xl:flex-row lg:justify-between flex-col">
        <div className="flex flex-col gap-4 xl:w-3/5 w-full">
          <div className="flex gap-2 items-center xl:justify-start justify-center">
            <div className="w-fit rounded-lg px-3 py-1 border-[2px] border-secondary-300 bg-secondary-200 text-secondary-400 font-bold italic text-sm">
              {/* Event Type */}
              {capitalize(eventDetails.event_type, true)}
            </div>
            <div className="w-fit rounded-lg px-3 py-1 border-[2px] border-primary-400 bg-primary-200 text-primary-500 font-bold italic text-sm">
              {/* Event Category */}
              {capitalize(eventDetails.event_category.name, true)}
            </div>
          </div>
          <h1 className="font-bold xl:text-5xl text-4xl leading-[140%] xl:text-left text-center">
            {/* event name */}
            {eventDetails.name}
          </h1>
          <div className="flex items-center lg:gap-5 gap-3 text-gray-500 xl:justify-normal justify-center xl:text-base text-sm lg:flex-nowrap flex-wrap">
            {/* information */}
            <div className="flex items-center gap-1">
              <AiOutlineCalendar />
              <span>
                {new Date(eventDetails.event_start_date_time).toDateString()}
              </span>
              <span>-</span>
              <span>
                {new Date(eventDetails.event_end_date_time).toDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CiLocationOn />
              <span>{eventDetails.event_location.name}</span>
            </div>
          </div>
          <div className="flex xl:justify-start justify-center">
            <p className="font-semibold text-left lg:text-base text-sm">
              {/* description */}
              {eventDetails.description}
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap xl:justify-start justify-center">
            <p className="italic text-gray-500 text-sm">tags:</p>
            {/* tags */}
            {eventDetails.event_tags.map((tag) => (
              <div
                key={tag.id}
                className="rounded-lg px-3 py-1 border-[2px] border-slate-300 bg-gray-200 text-gray-400 font-semibold italic text-xs"
              >
                {/* Event Interest Tag #n */}
                {capitalize(tag.name, true)}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-6 xl:justify-normal justify-center flex-wrap">
            {/* CTA buttons */}
            {!participation.data?.is_registered ? (
              <>
                {eventDetails.event_type !== "project" && (
                  <button
                    disabled={
                      registerParticipant.isLoading || participation.isLoading
                    }
                    onClick={handleRegisterAsParticipant}
                    className={cn(
                      "bg-primary-900 text-primary-400 text-sm px-6 py-2 rounded-3xl font-medium",
                      "disabled:bg-gray-300 disabled:text-gray-200"
                    )}
                  >
                    Register as Participant
                  </button>
                )}
                <button
                  disabled={
                    registerVolunteer.isLoading || participation.isLoading
                  }
                  onClick={handleRegisterAsVolunteer}
                  className={cn(
                    "text-primary-700 text-sm border border-primary-600 px-6 py-2 rounded-3xl font-medium",
                    "disabled:text-gray-300 disabled:border-gray-300"
                  )}
                >
                  Register as Volunteer
                </button>
              </>
            ) : (
              <>
                {isManagerInProject && (
                  <Link
                    href={BASE_URL + "?recordContribution=true"}
                    className="flex items-center gap-2 bg-secondary-400 text-secondary-100 text-sm border-[2px] border-secondary-400 px-5 py-2 rounded-md font-medium"
                  >
                    Record Participant Contribution <SlNote />
                  </Link>
                )}
                {isManager && (
                  <Link
                    href={BASE_URL + "?checkInParticipantOrVolunteer=true"}
                    shallow
                    className="flex items-center gap-2 bg-secondary-500 text-secondary-100 text-sm border-[2px] border-secondary-500 px-5 py-2 rounded-md font-medium"
                  >
                    Check In{" "}
                    {eventDetails.event_type === "initiative"
                      ? "Participant/Volunteer"
                      : "Volunteer"}
                    <BsPersonCheckFill className="text-lg" />
                  </Link>
                )}
                {isManagerInInitiative && (
                  <Link
                    href={"#"}
                    className="flex items-center gap-2 bg-secondary-500 text-secondary-100 text-sm border-[2px] border-secondary-500 px-5 py-2 rounded-md font-medium"
                  >
                    Check-out Participant
                    <BsPersonFillSlash className="text-lg" />
                  </Link>
                )}
                {isManager && (
                  <Link
                    href={BASE_URL + "?viewVolunteers=true"}
                    className="flex items-center gap-2 text-secondary-400 text-sm border-[2px] border-secondary-400 px-5 py-2 rounded-3xl font-medium"
                  >
                    View Volunteers
                    <GrUserManager className="[&>path]:!stroke-secondary-400" />
                  </Link>
                )}
                <Link
                  className="flex items-center gap-2 text-primary-700 text-sm border-[2px] border-primary-600 px-5 py-2 rounded-3xl font-medium"
                  href={`/event/${eventDetails.id}/forum`}
                >
                  Event Forum
                  <FiArrowUpRight className="font-extrabold text-xl text-primary-700" />
                </Link>
                {canCheckIn && (
                  <Link
                    href={BASE_URL + "?showRegisterQR=true"}
                    className="flex items-center gap-2 text-primary-500 text-xs border-[2px] border-primary-300 px-4 py-2 rounded-3xl font-medium"
                  >
                    Check-in
                    <BsQrCodeScan className="text-xl" />
                  </Link>
                )}
                {canCheckOut && (
                  <Link
                    href={BASE_URL + "?showCheckOut=true"}
                    className="flex items-center gap-2 text-danger-400 text-xs border-[2px] border-danger-400 px-4 py-2 rounded-3xl font-medium"
                  >
                    Check-out
                    <BiExit className="text-xl" />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        <div className="xl:w-2/5 w-full h-fit rounded-md aspect-video relative max-w-2xl xl:mx-0 mx-auto">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/event/image/${eventDetails.id}`}
            fill
            objectFit="cover"
            alt="picture"
            className="rounded-lg shadow-md border border-gray-500"
          />
        </div>
      </section>
      <Modal
        open={router.query.showCheckOut === "true"}
        onOverlayTap={closeModal}
      >
        <ReviewModal
          isParticipant={isParticipant!}
          eventId={eventDetails?.id}
        />
      </Modal>
      <Modal
        open={router.query.checkInParticipantOrVolunteer === "true"}
        onOverlayTap={closeModal}
      >
        <AttendanceModal
          eventId={eventDetails.id}
          onCheckInComplete={() => {}}
          onClose={closeModal}
        />
      </Modal>
      <Modal
        open={router.query.showRegisterQR === "true"}
        onOverlayTap={closeModal}
      >
        <ParticipantQRModal eventId={eventDetails.id} onClose={closeModal} />
      </Modal>
      {isManagerInProject && (
        <Modal
          open={router.query.recordContribution === "true"}
          onOverlayTap={closeModal}
        >
          <RecordContributionModal
            onClose={closeModal}
            eventDetails={eventDetails}
          />
        </Modal>
      )}
      {isManager && (
        <Modal
          open={router.query.viewVolunteers === "true"}
          onOverlayTap={closeModal}
        >
          <ViewVolunteersModal
            onClose={closeModal}
            eventDetails={eventDetails}
          />
        </Modal>
      )}
    </>
  );
};

export default EventInfoAndActions;