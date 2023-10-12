import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidPencil } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import Image from "next/image";
import { Modal, Switch } from "@/components/shared/elements";
import cn from "clsx";
import { useQuery } from "@tanstack/react-query";
import CreatableSelect from "react-select/creatable";
import { getTags } from "@/utils/fetchers/event/creation";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import Link from "next/link";
import { BsPersonCheckFill, BsPersonFillSlash } from "react-icons/bs";
import { GrUserManager } from "react-icons/gr";
import { SlNote } from "react-icons/sl";
import { AttendanceModal } from "../../attendance/AttendanceModal";
import { useRouter } from "next/router";
import RecordContributionModal from "../../contribution";
import ViewVolunteersModal from "../ViewVolunteersModal";
import { FiArrowUpRight } from "react-icons/fi";

interface Props {
  eventDetails: EventDetail;
}

const EventInfoAndActionsEditable = ({ eventDetails }: Props) => {
  const BASE_URL = `/event/${eventDetails.id}`;
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [isEditing, setIsEditing] = useState(false);
  const { data: tags, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const router = useRouter();

  const closeModal = () => {
    router.push(BASE_URL, undefined, { shallow: true });
  };

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
          <h1 className="font-bold xl:text-5xl text-4xl leading-[140%] lg:text-left text-center">
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
          <p className="font-semibold lg:text-base text-sm text-justify">
            {/* description */}
            {eventDetails.description}
          </p>

          <div className="flex items-center gap-3 flex-wrap xl:justify-start justify-center">
            <p className="italic text-gray-500 text-sm">tags:</p>
            {!isEditing &&
              eventDetails.event_tags.map((tag) => (
                <div
                  key={tag.id}
                  className="rounded-lg px-3 py-1 border-[2px] border-slate-300 bg-gray-200 text-gray-400 font-semibold italic text-xs"
                >
                  {/* Event Interest Tag #n */}
                  {capitalize(tag.name, true)}
                </div>
              ))}
            {isEditing && (
              <CreatableSelect
                backspaceRemovesValue={false}
                isMulti
                isClearable={false}
                isLoading={tagsLoading}
                defaultValue={options}
                options={tags?.map((tag) => ({
                  label: tag.name,
                  value: tag.name,
                }))}
                className="text-sm"
              />
            )}
          </div>
          <div className="mt-6 flex lg:flex-row flex-col items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4 xl:justify-normal justify-center flex-wrap">
              {/* Toggler */}
              <Switch label="Volunteer Registration:" disabled={!isEditing} />
              {eventDetails.event_type == "initiative" && (
                <Switch
                  label="Participant Registration:"
                  disabled={!isEditing}
                />
              )}
            </div>
            <div className="flex items-center gap-4 xl:justify-normal justify-center flex-wrap">
              <button
                className={cn(
                  "flex items-center gap-2 font-semibold rounded-md px-4 text-sm py-1",
                  isEditing &&
                    "border border-danger-300 text-danger-400 hover:bg-red-100",
                  !isEditing &&
                    "opacity-50 cursor-not-allowed border border-gray-400 text-gray-400"
                )}
              >
                Cancel Event
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center justify-center gap-2 border border-secondary-400 text-secondary-400 font-semibold rounded-md w-28 text-sm py-1 hover:bg-secondary-100"
              >
                {!isEditing ? (
                  <>
                    <BiSolidPencil className="inline" /> Edit Event
                  </>
                ) : (
                  <>
                    <ImCross className="inline text-[10px]" /> Finish Edit
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {eventDetails.event_type === "project" && (
              <Link
                href={BASE_URL + "?recordContribution=true"}
                className="flex items-center gap-2 bg-secondary-400 text-secondary-100 text-sm border-[2px] border-secondary-400 px-5 py-2 rounded-md font-medium"
              >
                Record Participant Contribution <SlNote />
              </Link>
            )}
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
            {eventDetails.event_type === "initiative" && (
              <Link
                href={"#"}
                className="flex items-center gap-2 bg-secondary-500 text-secondary-100 text-sm border-[2px] border-secondary-500 px-5 py-2 rounded-md font-medium"
              >
                Check-out Participant
                <BsPersonFillSlash className="text-lg" />
              </Link>
            )}
            <Link
              href={BASE_URL + "?viewVolunteers=true"}
              className="flex items-center gap-2 text-secondary-400 text-sm border-[2px] border-secondary-400 px-5 py-2 rounded-3xl font-medium"
            >
              View Volunteers
              <GrUserManager className="[&>path]:!stroke-secondary-400" />
            </Link>
            <Link
              className="flex items-center gap-2 text-primary-700 text-sm border-[2px] border-primary-600 px-5 py-2 rounded-3xl font-medium"
              href={`/event/${eventDetails.id}/forum`}
            >
              Event Forum
              <FiArrowUpRight className="font-extrabold text-xl text-primary-700" />
            </Link>
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
        open={router.query.recordContribution === "true"}
        onOverlayTap={closeModal}
      >
        <RecordContributionModal
          onClose={closeModal}
          eventDetails={eventDetails}
        />
      </Modal>
      <Modal
        open={router.query.viewVolunteers === "true"}
        onOverlayTap={closeModal}
      >
        <ViewVolunteersModal onClose={closeModal} eventDetails={eventDetails} />
      </Modal>
    </>
  );
};

export default EventInfoAndActionsEditable;
