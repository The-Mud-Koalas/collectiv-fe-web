import { Button, Modal } from "@/components/shared/elements";
import GreenTick from "@/components/shared/svg/icons/GreenTick";
import GreenTickNoBorder from "@/components/shared/svg/icons/GreenTickNoBorder";
import { garamond, inter } from "@/utils/constants/fonts";
import { capitalize } from "@/utils/helpers/formatting/capitalize";
import { FC } from "react";
import { RxCross2 } from "react-icons/rx";
interface Props {
  showModal: boolean;
  closeModal: () => void;
  type: "volunteer" | "participant";
  onConfirm: () => void;
}

const VOLUNTEER_REQUIREMENTS = [
  { id: "vol-1", text: "Demonstrate great commitment." },
  { id: "vol-2", text: "Exhibit strong communication skills." },
  { id: "vol-3", text: "Clearly express your Mmotivation and availability" },
  { id: "vol-4", text: "Being honest and minimizing foulplay." },
];

const EventParticipationModal: FC<Props> = ({
  showModal,
  closeModal,
  type,
  onConfirm,
}) => {
  return (
    <Modal open={showModal} onOverlayTap={closeModal}>
      <div
        style={{ width: "min(90vw, 600px)" }}
        className={`${inter.className} relative rounded-2xl bg-white px-8 py-10`}
      >
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 hover:bg-gray-200 p-1 rounded-md"
        >
          <RxCross2 />
        </button>
        <div className="text-center mx-auto">
          <div className="flex justify-center items-center">
            <GreenTick />
          </div>
          <h1
            className={`${garamond.className} text-5xl text-primary-900 my-3 `}
          >
            Register as {capitalize(type)}
          </h1>
          {type === "participant" ? (
            <div className="flex flex-col 2 my-4">
              <p
                className={`${inter.className} text-lg font-medium text-primary-800`}
              >
                Are you sure you want to register as a participant?
              </p>
              <p
                className={`${inter.className} text-lg font-medium text-primary-800`}
              >
                This action cannot be undone.
              </p>
            </div>
          ) : (
            <div className="flex flex-col my-4 items-center gap-4">
              <p
                className={`${inter.className} text-xl font-medium text-primary-800`}
              >
                Here are the requirements to apply as volunteer:
              </p>
              <ul className="flex flex-col">
                {VOLUNTEER_REQUIREMENTS.map((req) => (
                  <li
                    key={req.id}
                    className="flex items-center gap-2 text-base font-medium text-primary-800"
                  >
                    <GreenTickNoBorder />
                    <p>{req.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full flex gap-3 px-10">
          <Button
            onClick={closeModal}
            type="button"
            className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium text-primary-800 border-2"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              closeModal();
            }}
            className="w-full text-sm sm:text-base lg:text-lg px-4 py-2 rounded-full font-medium bg-primary-800 text-primary-300"
          >
            Register
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventParticipationModal;
