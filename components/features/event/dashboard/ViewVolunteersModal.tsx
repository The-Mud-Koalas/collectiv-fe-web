import React, { useState } from "react";
import cn from "clsx";
import {
  AiOutlineArrowRight,
  AiOutlineArrowLeft,
  AiOutlineSearch,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { inter } from "@/utils/constants/fonts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest } from "@/lib/fetch";
import { useAppContext } from "@/context/AppContext";
import { Switch } from "@/components/shared/elements";
import { toast } from "react-toastify";
import { COLORS } from "@/utils/constants/colors";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import { useDebounce } from "@/hooks/utils";

interface Props {
  eventDetails: EventDetail;
  onClose: () => void;
}

interface Volunteer {
  user_id: string;
  volunteer_name: string | null;
  has_manager_access: boolean;
  email_or_phone: string;
}

const VolunteerTableRow = ({
  volunteer,
  eventDetails,
}: {
  volunteer: Volunteer;
  eventDetails: EventDetail;
}) => {
  const queryClient = useQueryClient();
  const { user } = useAppContext();

  const updateAccess = useMutation({
    mutationFn: async (toggle: boolean) => {
      if (!user) return;
      const token = await user.getIdToken();
      if (toggle) {
        await postRequest({
          endpoint: "/participation/volunteer/grant-managerial-role",
          token,
          body: {
            event_id: eventDetails.id,
            volunteer_email_phone: volunteer.email_or_phone,
          },
        });
        toast.success(
          "Successfully granted managerial access to " +
            volunteer.email_or_phone
        );
      } else {
        if (!(user?.uid === eventDetails.event_creator_id)) {
          throw new Error("Only event creators can revoke managerial access");
        }
        await postRequest({
          endpoint: "/participation/volunteer/revoke-managerial-role",
          token,
          body: {
            event_id: eventDetails.id,
            volunteer_email_phone: volunteer.email_or_phone,
          },
        });
        toast.success(
          "Successfully revoked managerial access of " +
            volunteer.email_or_phone
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["volunteers", eventDetails.id],
      });
    },
    onError: (e: any) => {
      toast.error(e.cause.message);
    },
  });

  const cannotRevoke =
    !(user?.uid === eventDetails.event_creator_id) &&
    volunteer.has_manager_access;

  return (
    <tr key={volunteer.user_id}>
      <td className="p-2 pl-3 lg:p-4 lg:pl-8 text-slate-500 ">
        {volunteer.email_or_phone}
      </td>
      <td className="p-2 lg:p-4 text-slate-500 flex items-center">
        <div className="mx-auto">
          <Switch
            disabled={cannotRevoke || updateAccess.isLoading}
            isToggledOn={volunteer.has_manager_access}
            onToggle={updateAccess.mutate}
          />
        </div>
      </td>
    </tr>
  );
};

const VolunteersTable = ({
  volunteers,
  isLoading,
  eventDetails,
}: {
  isLoading?: boolean;
  eventDetails: EventDetail;
  volunteers: Volunteer[];
}) => {
  const fuse = new Fuse(volunteers, { keys: ["email_or_phone"] });
  const [filter, setFilter] = useState("");
  const debounced = useDebounce(filter);
  const filtered =
    debounced.trim() === ""
      ? volunteers
      : fuse.search(debounced).map((result) => result.item);

  const [currentPage, setCurrentPage] = useState(0);
  const volunteersPerPage = 5;
  const maxPages = Math.max(0, Math.ceil(filtered.length / 5) - 1);
  const startIndex = Math.min(currentPage, maxPages) * volunteersPerPage;
  const endIndex = startIndex + volunteersPerPage;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <motion.input
          whileFocus={{ boxShadow: `0 0 0 2px ${COLORS.secondary[400]}` }}
          className={`${inter.className} mb-2 outline-none bg-gray-50 lg:text-sm text-xs px-3 py-2 rounded-lg border-gray-300 border-[1.5px] disabled:text-gray-400`}
          type="text"
          onChange={(e) => {
            setFilter(e.currentTarget.value);
            setCurrentPage(0);
          }}
          placeholder="Volunteer email/phone"
        />
        <AiOutlineSearch className="lg:text-xl text-lg mb-2" />
      </div>
      <div>
        <table className="table-auto w-full text-xs lg:text-sm">
          <thead>
            <tr>
              <th className="border-b border-black font-medium p-2 text-gray-400 pl-3 pb-2 lg:p-4 lg:pl-8 lg:pb-3 text-left">
                Volunteer Email/Phone
              </th>
              <th className="border-b border-black font-medium rounded-tr-md text-gray-400 p-2 pl-3 pb-2 lg:p-4 lg:pb-3 text-center">
                Has Manager Access?
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(startIndex, endIndex).map((volunteer) => (
              <VolunteerTableRow
                key={volunteer.user_id}
                eventDetails={eventDetails}
                volunteer={volunteer}
              />
            ))}
            {!filtered.length && !isLoading && (
              <tr>
                <td
                  className="font-medium text-gray-500 italic text-center p-4"
                  colSpan={2}
                >
                  No volunteers found.
                </td>
              </tr>
            )}
            {isLoading && (
              <tr>
                <td
                  className="font-medium text-gray-500 p-4 italic text-center"
                  colSpan={2}
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2 justify-end mt-2 lg:text-sm text-xs">
        <button
          className="hover:bg-gray-200 p-1 rounded-md"
          onClick={() => {
            if (currentPage === 0) return;
            setCurrentPage(currentPage - 1);
          }}
        >
          <AiOutlineArrowLeft className="text-base lg:text-lg" />
        </button>
        <span className="text-gray-500 italic">
          Page {currentPage + 1} of {maxPages + 1}
        </span>
        <button
          className="hover:bg-gray-200 p-1 rounded-md"
          onClick={() => {
            if (currentPage === maxPages) return;
            setCurrentPage(currentPage + 1);
          }}
        >
          <AiOutlineArrowRight className="text-base lg:text-lg" />
        </button>
      </div>
    </div>
  );
};

const ViewVolunteersModal = ({ eventDetails, onClose }: Props) => {
  const { user } = useAppContext();
  const volunteers = useQuery({
    queryKey: ["volunteers", eventDetails.id],
    queryFn: async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const searchParams = new URLSearchParams({ event_id: eventDetails.id });
      const data = await getRequest({
        endpoint: "/event/managers/volunteers",
        searchParams,
        token,
      });
      return data as Volunteer[];
    },
  });

  return (
    <div
      style={{ width: "min(90vw, 600px)" }}
      className="rounded-md py-8 px-8 bg-white flex flex-col items-center gap-4 relative"
    >
      <p className={cn(inter.className, "text-3xl font-bold self-start")}>
        Event Volunteers
      </p>
      <div className="bg-primary-100 w-full rounded-md p-4 flex items-center gap-4">
        <AiOutlineInfoCircle className="lg:text-3xl text-xl text-primary-500" />
        <p className="lg:text-sm text-xs text-primary-600 font-semibold">
          Before granting managerial access to a volunteer, please ensure they
          have access to a location-enabled device.
        </p>
      </div>
      <VolunteersTable
        eventDetails={eventDetails}
        isLoading={volunteers.isLoading}
        volunteers={volunteers.data ?? []}
      />
      <button
        onClick={onClose}
        className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
      >
        <RxCross2 />
      </button>
    </div>
  );
};

export default ViewVolunteersModal;
