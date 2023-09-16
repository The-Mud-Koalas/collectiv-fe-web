import { useEventCreationContext } from "@/context/event/EventCreationContext";
import { inter } from "@/utils/constants/fonts";
import React from "react";
import GuidelineItem from "./GuidelineItem";
import Link from "next/link";
import { Button } from "@/components/shared/elements";

const USER_GUIDELINES = [
  {
    title: "Event Purpose and Goals",
    description: [
      "Clearly define the purpose and goals of the event, ensure they don’t ",
      "disrupt other’s beliefs and outlook",
      " on life."
    ],
  },
  {
    title: "Respect for Community Space",
    description: [
      "Respect the community space's ",
      "resources, other members, and property",
      " throughout the event planning and execution."
    ],
  },
  {
    title: "Accessibility and Inclusivity",
    description: [
      "Commit to making your event ",
      "accessible to all community",
      " members, including those with ",
      "disabilities.",
    ],
  },
  {
    title: "Inclusivity and Sensitivity",
    description: [
      "Promote an ",
      "inclusive and respectful atmosphere",
      " and encourage attendees to bemindful of different beliefs.",
    ],
  },
  {
    title: "Cleanliness and Care",
    description: [
      "Promise to leave the space in ",
      "the same or better condition than you start.",
      " Describe your cleanup and restoration plan.",
    ],
  },
  {
    title: "Safety and Security",
    description: [
      "Develop a ",
      "comprehensive safety plan,",
      " especially if it involves large gatherings or potentially risky activities.",
    ],
  },
  {
    title: "Conflict Resolution",
    description: [
      "Establish a ",
      "clear protocol for addressing any cultural disputes or concerns",
      " that may arise during the event.",
    ],
  },
];

const Guidelines = () => {
  const { changeStage } = useEventCreationContext();
  return (
    <>
      <section
        id="gl-title"
        className={`flex text-primary-800 flex-col gap-3 ${inter.className} font-bold text-5xl`}
      >
        <h1>Your Event, Our Guidelines: </h1>
        <h1>Building Together for a Brighter Community. </h1>
      </section>
      <section
        id="gl-explanation"
        className={`${inter.className} w-full max-w-[75ch] font-medium text-2xl text-primary-800`}
      >
        <p>
          We deeply respect the diverse beliefs, commitments, and perspectives
          of our community members.
        </p>
        <p>
          We encourage you to carefully review the event you intend to create
          and ensure that it aligns with our guidelines to maintain the harmony
          of our community space.
        </p>
      </section>
      <section
        id="gl-guidelines"
        className={`${inter.className} flex flex-col gap-6 font-medium text-primary-800`}
      >
        <p className="text-2xl">
          We encourage a{" "}
          <span className="bg-secondary-200">
            respectful and inclusive community
          </span>
          {" "}and expect all events to:
        </p>
        <div className="grid grid-rows-2 items-center sm:grid-cols-4 gap-8  w-full">
          {
            USER_GUIDELINES.map((guideline, idx) => <GuidelineItem {...guideline} idx={idx + 1} key={`gl-${idx}`}/>)
          }
        </div>
      </section>
      <section id="gl-agree" className={inter.className}>
        <h3 className="font-semibold text-primary-800 text-2xl">Do you agree to comply with the guidelines above?</h3>
        <div className="flex w-fit gap-4 my-4">
          <Link href="/">
            <Button className="font-medium px-2 py-1 text-base rounded-full border-[1px] border-primary-800" tabIndex={-1}>I Disagree</Button>
          </Link>
          <Button className="font-medium px-3 py-1 text-base rounded-full bg-primary-800 text-primary-300" onClick={changeStage(1)}>I Agree</Button>
        </div>
      </section>
    </>
  );
};

export default Guidelines;
