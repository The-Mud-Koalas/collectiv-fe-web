import { Button } from "@/components/shared/elements";
import Tick from "@/components/shared/svg/icons/Tick";
import { COLORS } from "@/utils/constants/colors";
import { inter } from "@/utils/constants/fonts";
import Link from "next/link";
import React from "react";

const EventCreated = () => {
  return (
    <div className="w-fit flex flex-col gap-6 sm:gap-10">
      <section
        id="gl-title"
        className={`flex text-primary-800 flex-col gap-1 sm:gap-3 ${inter.className} font-bold text-2xl sm:text-5xl`}
      >
        <h1>Your event has been created!</h1>
      </section>
      <section
        id="gl-explanation"
        className={`${inter.className} flex flex-col gap-8 w-full max-w-[75ch] font-medium text-base sm:text-2xl text-primary-800`}
      >
        <p>
          Thank you for trusting us to bring an event to our community space.
          Keep in mind that you can update your event details at your
          convenience.
        </p>

        <Link href="/event/discover">
          <Button
            className="flex items-center gap-2 font-medium px-3 py-1 text-sm sm:text-base rounded-full border-[1px] bg-primary-800 text-primary-300"
            tabIndex={-1}
          >
            <p>Finish</p>
            <Tick color={COLORS.primary[300]} dimensions={{ width: 20 }}/>
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default EventCreated;
