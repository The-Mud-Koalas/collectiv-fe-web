import React, { useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidPencil } from "react-icons/bi";
import { FiSave } from "react-icons/fi";
import Image from "next/image";
import { Modal, Switch } from "@/components/shared/elements";
import cn from "clsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import StatusChangeConfirmationModal from "./StatusChangeConfirmationModal";
import { useAppContext } from "@/context/AppContext";
import {
  Controller,
  FieldError,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { DateField } from "@/components/shared/forms";
import { motion } from "framer-motion";
import { inter } from "@/utils/constants/fonts";
import { COLORS } from "@/utils/constants/colors";
import { postRequest } from "@/lib/fetch";
import { toast } from "react-toastify";
import CheckoutModal from "../../attendance/CheckoutModal";

interface Props {
  eventDetails: EventDetail;
  isFetching: boolean;
}

const EditableTagsField = ({
  form,
}: {
  eventDetails: EventDetail;
  form: UseFormReturn<UpdateInitiativeEventDetail, any, undefined>;
}) => {
  const [inputValue, setInputValue] = useState("");
  const tags = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  const { control, setValue } = form;

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field: { value } }) => (
        <CreatableSelect
          isMulti
          isClearable={false}
          value={value}
          inputValue={inputValue}
          onInputChange={(newVal) => setInputValue(newVal)}
          onChange={(newValue) =>
            setValue("tags", newValue.slice(), { shouldDirty: true })
          }
          options={tags.data?.map((tag) => ({
            label: tag.name,
            value: tag.id,
          }))}
        />
      )}
    />
  );
};

const EditableDateField = ({
  eventDetails,
  form,
}: {
  eventDetails: EventDetail;
  form: UseFormReturn<UpdateInitiativeEventDetail, any, undefined>;
}) => {
  const {
    formState: { errors },
    control,
  } = form;

  return (
    <div className="flex items-center gap-4">
      <DateField
        field="start_date_time"
        label={`${capitalize(eventDetails.event_type)} Start Date`}
        minDate={new Date()}
        showTimeInput
        dateFormat="MMMM d, yyyy hh:mm a"
        control={control}
        error={errors.start_date_time as FieldError}
        rules={{ required: "Please select a start date." }}
      />
      <DateField
        field="end_date_time"
        label={`${capitalize(eventDetails.event_type)} End Date`}
        minDate={new Date(eventDetails.event_start_date_time)}
        showTimeInput
        dateFormat="MMMM d, yyyy hh:mm a"
        control={control}
        error={errors.start_date_time as FieldError}
        rules={{ required: "Please select an end date." }}
      />
    </div>
  );
};

const EventInfoAndActionsEditable = ({ eventDetails, isFetching }: Props) => {
  const BASE_URL = `/event/${eventDetails.id}`;
  const { user } = useAppContext();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const createNewTags = useMutation(
    async (tags: SelectOption<string>[]) => {
      if (!user) return [] as Tag[];
      const token = await user.getIdToken();
      const allTags: Tag[] = [];
      const newTags: SelectOption<string>[] = tags.filter(
        (tag) => tag.__isNew__
      );
      const existingTags: SelectOption<string>[] = tags.filter(
        (tag) => !tag.__isNew__
      );

      allTags.push(
        ...existingTags.map((tag) => ({ id: tag.value, name: tag.label }))
      );

      if (newTags.length) {
        const response = (await postRequest({
          endpoint: "/event/tags/get-or-create/multiple",
          token,
          body: { tags: newTags.map((tag) => tag.label) },
        })) as Tag[];

        allTags.push(...response);
      }
      return allTags;
    },
    {
      onError: (e: any) => {
        toast.error(e.cause.message);
      },
    }
  );

  const updateEvent = useMutation(
    async (
      data: Omit<UpdateInitiativeEventDetail, "tags"> & { tags: Tag[] }
    ) => {
      if (!user) return;
      const token = await user.getIdToken();
      await postRequest({
        token,
        endpoint: `/event/update/${eventDetails.id}`,
        body: {
          volunteer_registration_enabled: data.volunteer_registration_enabled,
          start_date_time: data.start_date_time.toISOString(),
          end_date_time: data.end_date_time.toISOString(),
          tags: data.tags.map((tag) => tag.id),
          participant_registration_enabled:
            data.participant_registration_enabled,
          project_goal: (eventDetails as ProjectDetail).goal,
          goal_kind: (eventDetails as ProjectDetail).goal_kind,
          goal_measurement_unit: (eventDetails as ProjectDetail)
            .measurement_unit,
        },
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["event-details", eventDetails.id],
        });
        setIsEditing(false);
        toast.success("Event successfully updated!");
        resetForm();
      },
      onError: (e: any) => {
        toast.error(e.cause.message);
      },
    }
  );

  const currentStartDate = new Date(eventDetails.event_start_date_time);
  const currentEndDate = new Date(eventDetails.event_end_date_time);

  const updateForm = useForm<UpdateInitiativeEventDetail>({
    defaultValues: {
      start_date_time: currentStartDate,
      end_date_time: currentEndDate,
      participant_registration_enabled:
        (eventDetails as InitiativeDetail).participation_registration_enabled ??
        false,
      volunteer_registration_enabled:
        eventDetails.volunteer_registration_enabled,
      tags: eventDetails.event_tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })),
    },
  });

  const resetForm = () => {
    const eventData: EventDetail = queryClient.getQueryData([
      "event-details",
      eventDetails.id,
    ])!;
    const currentStartDate = new Date(eventData.event_start_date_time);
    const currentEndDate = new Date(eventData.event_end_date_time);
    updateForm.reset({
      start_date_time: currentStartDate,
      end_date_time: currentEndDate,
      participant_registration_enabled:
        (eventData as InitiativeDetail).participation_registration_enabled ??
        false,
      volunteer_registration_enabled: eventData.volunteer_registration_enabled,
      tags: eventData.event_tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })),
    });
  };

  const router = useRouter();

  const closeModal = () => {
    router.push(BASE_URL, undefined, { shallow: true });
  };

  const onSubmit: SubmitHandler<UpdateInitiativeEventDetail> = async (data) => {
    const formPartiallyDirty =
      Object.keys(updateForm.formState.dirtyFields).length != 0;
    if (!user) return;
    if (!formPartiallyDirty) {
      setIsEditing(false);
      return;
    }
    const { tags, ...rest } = data;
    createNewTags.mutateAsync(data.tags).then((allTags) => {
      updateEvent.mutate({ tags: allTags, ...rest });
    });
  };

  return (
    <>
      <section className="flex gap-6 mt-5 xl:flex-row lg:justify-between flex-col">
        <form
          onSubmit={updateForm.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 xl:w-3/5 w-full"
        >
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
              {!isEditing && (
                <>
                  <AiOutlineCalendar />
                  <span>
                    {new Date(
                      eventDetails.event_start_date_time
                    ).toDateString()}
                  </span>
                  <span>-</span>
                  <span>
                    {new Date(eventDetails.event_end_date_time).toDateString()}
                  </span>
                </>
              )}
              {isEditing && (
                <EditableDateField
                  form={updateForm}
                  eventDetails={eventDetails}
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              {!isEditing && (
                <>
                  <CiLocationOn />
                  <span>{eventDetails.event_location.name}</span>
                </>
              )}
              {isEditing && (
                <div className="flex flex-col gap-1 w-full opacity-50">
                  <label
                    className={`${inter.className} text-sm sm:text-base font-small`}
                  >
                    Location <span className="text-red-500">*</span>
                  </label>
                  <motion.input
                    whileFocus={{
                      boxShadow: `0 0 0 2px ${COLORS.secondary[400]}`,
                    }}
                    disabled
                    className={`${inter.className} outline-none disabled:cursor-not-allowed disabled:bg-gray-100 bg-gray-50 text-sm sm:text-base px-3 py-3 rounded-lg border-gray-300 border-[1.5px] disabled:text-gray-400`}
                    type="text"
                    value={eventDetails.event_location.name}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex xl:justify-start justify-center">
            <p className="font-semibold lg:text-base text-sm text-justify">
              {/* description */}
              {eventDetails.description}
            </p>
          </div>
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
              <EditableTagsField
                form={updateForm}
                eventDetails={eventDetails}
              />
            )}
          </div>
          <div className="mt-6 flex lg:flex-row flex-col items-center xl:justify-between justify-center flex-wrap gap-6">
            <div
              className={cn(
                "flex items-center gap-4 xl:justify-normal justify-center flex-wrap"
              )}
            >
              {/* Toggler */}
              <div
                className={cn(
                  "py-2 px-4 rounded-md",
                  !isEditing && "bg-gray-200",
                  isEditing && "bg-secondary-200 text-secondary-500"
                )}
              >
                <Controller
                  control={updateForm.control}
                  name="volunteer_registration_enabled"
                  render={({ field: { value } }) => (
                    <Switch
                      label="Volunteer Registration:"
                      disabled={!isEditing}
                      onToggle={(toggled) =>
                        updateForm.setValue(
                          "volunteer_registration_enabled",
                          toggled,
                          { shouldDirty: true }
                        )
                      }
                      isToggledOn={value}
                    />
                  )}
                />
              </div>
              {eventDetails.event_type == "initiative" && (
                <div
                  className={cn(
                    "py-2 px-4 rounded-md",
                    !isEditing && "bg-gray-200",
                    isEditing && "bg-secondary-200 text-secondary-500"
                  )}
                >
                  <Controller
                    control={updateForm.control}
                    name="participant_registration_enabled"
                    render={({ field: { value } }) => (
                      <Switch
                        label="Participant Registration:"
                        disabled={!isEditing}
                        onToggle={(toggled) =>
                          updateForm.setValue(
                            "participant_registration_enabled",
                            toggled,
                            { shouldDirty: true }
                          )
                        }
                        isToggledOn={value}
                      />
                    )}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 xl:justify-normal justify-center flex-wrap">
              {isEditing && (
                <button
                  type={"button"}
                  disabled={
                    isFetching ||
                    createNewTags.isLoading ||
                    updateEvent.isLoading
                  }
                  onClick={() => {
                    setIsEditing(false);
                    resetForm();
                  }}
                  className="flex items-center justify-center gap-2 border disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed border-secondary-400 text-secondary-400 font-semibold rounded-md w-28 text-sm py-1 hover:bg-secondary-100"
                >
                  Cancel Edit
                </button>
              )}
              {!isEditing && (
                <button
                  type={"button"}
                  disabled={
                    isFetching ||
                    createNewTags.isLoading ||
                    updateEvent.isLoading
                  }
                  onClick={() => {
                    setIsEditing(true);
                    resetForm();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-2 border disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed border-secondary-400 text-secondary-400 font-semibold rounded-md w-28 text-sm py-1 hover:bg-secondary-100"
                >
                  <BiSolidPencil className="inline" /> Edit Event
                </button>
              )}
              {isEditing && (
                <button
                  type={"submit"}
                  disabled={
                    isFetching ||
                    createNewTags.isLoading ||
                    updateEvent.isLoading
                  }
                  className="flex items-center justify-center gap-2 border disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed border-secondary-400 text-secondary-400 font-semibold rounded-md w-28 text-sm py-1 hover:bg-secondary-100"
                >
                  <FiSave className="inline text-[10px] text-base" /> Save Edit
                </button>
              )}
              {eventDetails.status === "Scheduled" && (
                <Link
                  href={BASE_URL + "?confirmationStartEvent=true"}
                  className={cn(
                    "flex items-center gap-2 font-semibold rounded-md px-6 text-sm py-2 border-[2px]",
                    "border-primary-700 bg-primary-200 text-primary-700"
                  )}
                >
                  Start Event
                </Link>
              )}
              {eventDetails.status === "Scheduled" && (
                <Link
                  href={BASE_URL + "?confirmationCancelEvent=true"}
                  className={cn(
                    "flex items-center gap-2 font-semibold rounded-md px-4 text-sm py-1",
                    "border border-danger-300 text-danger-400 hover:bg-red-100"
                  )}
                >
                  Cancel Event
                </Link>
              )}
              {eventDetails.status === "On Going" && (
                <Link
                  href={BASE_URL + "?confirmationCompleteEvent=true"}
                  className={cn(
                    "flex items-center gap-2 font-semibold rounded-md px-6 text-sm py-2 border-[2px]",
                    "border-secondary-400 bg-secondary-200 text-secondary-400"
                  )}
                >
                  Complete Event
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center xl:justify-normal mt-4">
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
                href={BASE_URL + "?checkOutParticipant=true"}
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
        </form>
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
        open={router.query.checkOutParticipant === "true"}
        onOverlayTap={closeModal}
      >
        <CheckoutModal eventId={eventDetails.id} onClose={closeModal} />
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
      {eventDetails.status === "Scheduled" && (
        <Modal
          open={router.query.confirmationStartEvent === "true"}
          onOverlayTap={closeModal}
        >
          <StatusChangeConfirmationModal
            eventDetails={eventDetails}
            onClose={closeModal}
            type="start"
          />
        </Modal>
      )}
      {eventDetails.status === "Scheduled" && (
        <Modal
          open={router.query.confirmationCancelEvent === "true"}
          onOverlayTap={closeModal}
        >
          <StatusChangeConfirmationModal
            eventDetails={eventDetails}
            onClose={closeModal}
            type="cancel"
          />
        </Modal>
      )}
      {eventDetails.status === "On Going" && (
        <Modal
          open={router.query.confirmationCompleteEvent === "true"}
          onOverlayTap={closeModal}
        >
          <StatusChangeConfirmationModal
            eventDetails={eventDetails}
            onClose={closeModal}
            type="complete"
          />
        </Modal>
      )}
    </>
  );
};

export default EventInfoAndActionsEditable;
