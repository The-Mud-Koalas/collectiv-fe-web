import CollectivLogo from "@/components/shared/svg/logo/CollectivLogo";
import { COLORS } from "@/utils/constants/colors";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import cn from "clsx";
import { garamond, inter, interItalics } from "@/utils/constants/fonts";
import { BsArrowDown } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "@/context/AppContext";
import { getRequest } from "@/lib/fetch";
import { useWindowSize } from "@/hooks/display";
import { Loading } from "@/components/shared/layouts";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/shared/elements";
import { Back } from "@/components/shared/svg/icons";
import { useRouter } from "next/router";

interface WrappedData {
  last_month_created_events_count: number;
  last_month_volunteer_count: number;
  last_month_volunteering_duration: {
    total_volunteering_duration: number | null;
  };
  last_month_initiative_count: number;
  last_month_initiative_duration: {
    total_initiative_duration: number | null;
  };
  last_month_contributions: {
    total_contribution: number;
    goal_kind: string;
    measurement_unit: string;
  }[];
  last_month_overall_rank: number;
  total_users: number;
}

function ordinalSuffixOf(i: number) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

const RankMeter = ({
  rank,
  outOf,
  onComplete,
  isStatic,
  className,
  classNameText,
  responsiveBorder,
}: {
  rank: number;
  outOf?: number;
  onComplete?: () => void;
  isStatic?: boolean;
  className?: string;
  classNameText?: string;
  responsiveBorder?: boolean;
}) => {
  const rankContainer = useRef<HTMLDivElement>(null);
  const completeCallback = useRef(onComplete);

  useEffect(() => {
    completeCallback.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!!isStatic) return;
    if (!rankContainer.current) return;

    const node = rankContainer.current;
    const controls = animate(outOf ?? 100, rank, {
      type: "tween",
      duration: 2,
      delay: 1,
      onUpdate(value) {
        node.textContent = `${ordinalSuffixOf(+value.toFixed(0))}`;
      },
      onComplete() {
        completeCallback.current?.();
      },
    });

    return () => controls.stop();
  }, [rank, outOf, isStatic]);

  return (
    <motion.div
      initial={isStatic ? false : { scale: 0.5 }}
      animate={isStatic ? false : { scale: 1 }}
      layout
      className={cn(
        "relative flex items-center justify-center lg:h-[400px] lg:w-[400px] w-[300px] h-[300px]",
        className
      )}
    >
      <motion.div
        style={{ width: "90%", height: "90%" }}
        animate={
          isStatic
            ? false
            : {
                width: ["90%", "110%", "80%", "60%", "90%"],
                height: ["90%", "110%", "80%", "60%", "90%"],
              }
        }
        transition={{ duration: 2.5, delay: 0.5 }}
        className={cn(
          "border-primary-300 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          !responsiveBorder && "border-[25px]",
          responsiveBorder && "lg:border-[25px] md:border-[20px] border-[15px]"
        )}
      >
        <motion.div
          style={{ width: "95%", height: "95%" }}
          animate={
            isStatic
              ? false
              : {
                  width: ["95%", "70%", "80%", "110%", "95%"],
                  height: ["95%", "70%", "80%", "110%", "95%"],
                }
          }
          transition={{ duration: 2.5, delay: 0.5 }}
          className={cn(
            "border-secondary-300 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
            !responsiveBorder && "border-[15px]",
            responsiveBorder && "lg:border-[15px] md:border-[10px] border-[5px]"
          )}
        >
          <motion.div
            className={cn(
              garamond.className,
              "lg:text-7xl text-5xl font-bold",
              classNameText
            )}
            ref={rankContainer}
          >
            {ordinalSuffixOf(+rank.toFixed(0))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FallingActivities = ({
  wrappedData,
  uptoInView,
}: {
  wrappedData: WrappedData;
  uptoInView: boolean;
}) => {
  const volunteeringDuration = Math.round(
    (wrappedData.last_month_volunteering_duration.total_volunteering_duration ??
      0) / 3600
  );
  const participationDuration = Math.round(
    (wrappedData.last_month_initiative_duration.total_initiative_duration ??
      0) / 3600
  );

  return (
    <>
      <motion.div
        initial={{ top: -200 }}
        animate={uptoInView ? { top: "30%" } : false}
        transition={{ delay: 1 }}
        style={{
          x: "-50%",
          y: "-50%",
          left: "50%",
          boxShadow: "0 0 1px 0px white inset, 0 0 1px 0px white",
          rotate: 5,
        }}
        className={cn(
          "absolute bg-white lg:w-[min(80%,_600px)] w-[90%] rounded-lg lg:py-8 sm:px-6 px-3 py-12 xl:text-2xl lg:text-xl border-[2px] border-secondary-500 flex flex-col items-center gap-4",
          inter.className,
          "text-secondary-500"
        )}
      >
        <p
          style={{ lineHeight: 1.4 }}
          className="text-center md:text-2xl text-xl"
        >
          You hosted{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {wrappedData.last_month_created_events_count} events
          </span>{" "}
          this month!
        </p>
      </motion.div>
      <motion.div
        initial={{ top: -200 }}
        animate={uptoInView ? { top: "50%" } : false}
        transition={{ delay: 0.5 }}
        style={{
          x: "-50%",
          y: "-50%",
          left: "50%",
          boxShadow: "0 0 1px 0px white inset, 0 0 1px 0px white",
          rotate: -4,
        }}
        className={cn(
          "absolute bg-white lg:w-[min(80%,_600px)] w-[90%] rounded-lg lg:py-8 sm:px-6 px-3 py-12 xl:text-2xl lg:text-xl border-[2px] border-secondary-500 flex flex-col items-center gap-4",
          inter.className,
          "text-secondary-500"
        )}
      >
        <p
          style={{ lineHeight: 1.4 }}
          className="text-center md:text-2xl text-xl"
        >
          You spent{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {volunteeringDuration} hours
          </span>{" "}
          volunteering for{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {wrappedData.last_month_volunteer_count} events
          </span>
        </p>
      </motion.div>
      <motion.div
        initial={{ top: -200 }}
        animate={uptoInView ? { top: "70%" } : false}
        style={{
          x: "-50%",
          y: "-50%",
          left: "50%",
          boxShadow: "0 0 1px 0px white inset, 0 0 1px 0px white",
          rotate: 2,
        }}
        className={cn(
          "absolute font-medium bg-white lg:w-[min(80%,_600px)] w-[90%] rounded-lg lg:py-8 sm:px-6 px-3 py-12 xl:text-2xl lg:text-xl border-[2px] border-secondary-500 flex flex-col items-center gap-4",
          inter.className,
          "text-secondary-500"
        )}
      >
        <p
          style={{ lineHeight: 1.4 }}
          className="text-center md:text-2xl text-xl"
        >
          You spent{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {participationDuration} hours
          </span>{" "}
          participating in{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {wrappedData.last_month_initiative_count} events
          </span>
        </p>
      </motion.div>
    </>
  );
};

const SlidingActivities = ({ wrappedData }: { wrappedData: WrappedData }) => {
  const volunteeringDuration = Math.round(
    (wrappedData.last_month_volunteering_duration.total_volunteering_duration ??
      0) / 3600
  );
  const participationDuration = Math.round(
    (wrappedData.last_month_initiative_duration.total_initiative_duration ??
      0) / 3600
  );

  return (
    <div className="h-full flex flex-col gap-2 items-center py-4 overflow-hidden">
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ type: "tween" }}
        className="border-[2px] rounded-lg w-[90%] border-secondary-400 text-secondary-500 bg-white h-1/3 flex items-center justify-center px-2"
      >
        <p
          style={{ lineHeight: 1.6 }}
          className="text-center md:text-xl sm:text-lg text-base"
        >
          You hosted{" "}
          <span className="font-bold bg-secondary-200 px-2 py-[2px] rounded-full">
            {wrappedData.last_month_created_events_count} events
          </span>{" "}
          this month!
        </p>
      </motion.div>
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ type: "tween" }}
        className="border-[2px] rounded-lg w-[90%] border-secondary-400 text-secondary-500 bg-white h-1/3 flex items-center justify-center px-2"
      >
        <p
          style={{ lineHeight: 1.6 }}
          className="text-center md:text-xl sm:text-lg text-base"
        >
          You spent{" "}
          <span className="font-bold bg-secondary-200 px-2 lg:py-[2px] rounded-full">
            {volunteeringDuration} hours
          </span>{" "}
          volunteering for{" "}
          <span className="font-bold bg-secondary-200 px-2 lg:py-[2px] rounded-full">
            {wrappedData.last_month_volunteer_count} events
          </span>
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        transition={{ type: "tween" }}
        className="border-[2px] rounded-lg w-[90%] border-secondary-400 text-secondary-500 bg-white h-1/3 flex items-center justify-center px-2"
      >
        <p
          style={{ lineHeight: 1.6 }}
          className="text-center md:text-xl sm:text-lg text-base"
        >
          You spent{" "}
          <span className="font-bold bg-secondary-200 px-2 lg:py-[2px] rounded-full">
            {participationDuration} hours
          </span>{" "}
          participating in{" "}
          <span className="font-bold bg-secondary-200 px-2 lg:py-[2px] rounded-full">
            {wrappedData.last_month_initiative_count} events
          </span>
        </p>
      </motion.div>
    </div>
  );
};

const WrappedComponent = ({ wrappedData }: { wrappedData: WrappedData }) => {
  const uptoRef = useRef<HTMLDivElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showTitle, setShowTitle] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [showRankCaption, setShowRankCaption] = useState(false);
  const uptoInView = useInView(uptoRef, { amount: 0.8, once: true });
  const rankInView = useInView(rankRef, { amount: 1, once: true });
  const { windowWidth } = useWindowSize();

  const colors = [
    COLORS.primary[300],
    COLORS.primary[400],
    COLORS.primary[500],
    COLORS.primary[600],
    COLORS.primary[700],
    COLORS.secondary[300],
    COLORS.secondary[400],
    COLORS.secondary[500],
    COLORS.gray["400"],
    COLORS.gray["600"],
  ];

  // const dummy: WrappedData["last_month_contributions"] = [
  //   { goal_kind: "rice", measurement_unit: "kg", total_contribution: 6 },
  //   { goal_kind: "shoes", measurement_unit: "pairs", total_contribution: 43 },
  //   { goal_kind: "bottles", measurement_unit: "", total_contribution: 12 },
  //   { goal_kind: "clothes", measurement_unit: "pieces", total_contribution: 87 },
  //   { goal_kind: "laptop", measurement_unit: "units", total_contribution: 4 },
  //   { goal_kind: "pillows", measurement_unit: "", total_contribution: 35 },
  //   { goal_kind: "water", measurement_unit: "litres", total_contribution: 50 },
  //   { goal_kind: "bread", measurement_unit: "servings", total_contribution: 59 },
  //   { goal_kind: "toys", measurement_unit: "", total_contribution: 13 },
  //   { goal_kind: "coffee", measurement_unit: "kg", total_contribution: 3 },
  // ];

  const contributions = wrappedData.last_month_contributions
    .sort((a, b) => b.total_contribution - a.total_contribution)
    .map((goal, i) => ({
      name:
        goal.total_contribution > 0
          ? `${goal.goal_kind} (${goal.measurement_unit})`
          : undefined,
      value: goal.total_contribution,
      caption:
        goal.total_contribution > 0
          ? `${goal.total_contribution} ${goal.measurement_unit} ${goal.goal_kind}`
          : undefined,
      fill: colors[i],
    }))
    .slice(0, 10);

  return (
    <section
      id="wrapped-main"
      className={cn(
        "h-screen",
        canScroll && "overflow-auto",
        !canScroll && "overflow-hidden"
      )}
    >
      <Button className="absolute top-5 left-5" onClick={() => router.back()}>
        <Back color={COLORS.primary[800]} dimensions={{ width: 40 }} />
      </Button>
      <motion.div
        animate={{
          backgroundColor: [
            COLORS.primary[100],
            COLORS.primary[200],
            COLORS.primary[300],
            COLORS.primary[400],
            COLORS.primary[500],
            COLORS.primary[100],
            COLORS.primary[50],
            COLORS.primary[100],
          ],
        }}
        transition={{ duration: 4, delay: 0.5 }}
        className="min-h-screen overflow-hidden flex gap-12 flex-col items-center justify-center lg:px-0 px-2"
      >
        <motion.div
          layout
          initial={{ rotate: 360, scale: 0 }}
          animate={{
            rotate: [360, 370, 380, 390, 400, 0, -10, 0],
            scale: 1,
          }}
          transition={{
            rotate: { duration: 4, delay: 0.5, type: "keyframes" },
            scale: { duration: 0.6, type: "spring" },
          }}
          onAnimationComplete={() => setShowTitle(true)}
        >
          <CollectivLogo
            color={COLORS.primary["700"]}
            dimensions={{ width: 150 }}
          />
        </motion.div>
        {showTitle && (
          <motion.h1
            layout
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            onAnimationComplete={() => setCanScroll(true)}
            className={cn(
              garamond.className,
              "lg:text-6xl md:text-4xl sm:text-3xl text-2xl text-center font-medium whitespace-normal break-all"
            )}
          >
            #CollectivMonthlyWrapped
          </motion.h1>
        )}
        {canScroll && (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ y: [-5, 5, -5, 5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <BsArrowDown className="text-lg" />
            </motion.div>
            <span className="lg:text-base text-sm">keep scrolling</span>
          </div>
        )}
      </motion.div>
      <motion.div className="h-screen bg-tertiary-100 flex flex-col items-center justify-center p-4 gap-8">
        <p
          className={cn(
            garamond.className,
            "xl:text-7xl lg:text-6xl md:text-5xl text-4xl text-primary-700"
          )}
        >
          <q>
            First of all, we would like to express our{" "}
            <strong>heartfelt gratitude</strong> for your time and effort, which
            you&apos;ve dedicated so selflessly to
            <strong> our community</strong>. Your commitment to making a
            <strong> positive impact</strong>, your tireless work, and your
            unwavering dedication will not go unnoticed.
          </q>
        </p>
        <p
          className={cn(
            garamond.className,
            "lg:text-4xl md:text-4xl text-3xl self-end"
          )}
        >
          Sincerely,
          <br />
          <span className={cn(interItalics.className, "font-medium italic")}>
            The Collectiv Team
          </span>
        </p>
      </motion.div>
      <motion.div className="bg-secondary-200 min-h-screen">
        <div className="flex lg:flex-row flex-col min-h-screen">
          <div className="lg:min-h-screen min-h-[50vh] lg:w-1/2 w-full flex justify-center items-end lg:items-center px-8">
            <p
              className={cn(
                "text-7xl xl:text-8xl text-primary-700",
                garamond.className
              )}
            >
              What have you been up to?
            </p>
          </div>
          <div
            ref={uptoRef}
            className="min-h-[max(100vh,_900px)] lg:w-1/2 w-full overflow-hidden relative"
          >
            <FallingActivities
              wrappedData={wrappedData}
              uptoInView={uptoInView}
            />
          </div>
        </div>
      </motion.div>
      <motion.div className="bg-tertiary-100 min-h-screen">
        <div className="flex lg:flex-row flex-col-reverse min-h-screen">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="lg:h-screen lg:mt-0 mt-14 xl:p-20 h-[50vh] lg:w-1/2 w-full flex justify-center items-center"
          >
            {contributions.length > 0 && (
              <ResponsiveContainer
                className={"grow"}
                width="100%"
                height="100%"
              >
                <BarChart
                  margin={{ left: 20, top: 20, right: 120 }}
                  layout="vertical"
                  data={contributions}
                  barCategoryGap={10}
                >
                  <YAxis dataKey="name" type="category" hide />
                  <XAxis type="number" dataKey={"value"} hide />
                  <Bar maxBarSize={200} dataKey={"value"} fill="fill">
                    <LabelList
                      position={"right"}
                      dataKey={"caption"}
                      fill="black"
                      width={200}
                      style={{
                        fontWeight: "bold",
                        fontFamily: inter.style.fontFamily,
                        fontSize: "clamp(14px, 1.5vw, 20px)",
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
            {!contributions.length && (
              <p className={cn(garamond.className, "text-2xl")}>
                You have <strong>no contributions yet</strong> this month.
                Don&apos;t worry, What truly matters is your willingness and
                enthusiasm to get involved and make a difference!
              </p>
            )}
          </motion.div>
          <div className="lg:min-h-screen min-h-[50vh] lg:w-1/2 w-full flex justify-center items-center lg:px-0 px-6">
            <p
              className={cn(
                "text-7xl lg:text-6xl text-primary-700 text-center",
                garamond.className
              )}
            >
              Have a look at your top ten contributions!
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div
        ref={rankRef}
        className="min-h-screen flex flex-col justify-center items-center px-5 relative"
      >
        <AnimatePresence>
          {rankInView && (
            <>
              {rankInView && (
                <RankMeter
                  rank={wrappedData.last_month_overall_rank}
                  outOf={wrappedData.total_users}
                  onComplete={() => setShowRankCaption(true)}
                />
              )}
              {showRankCaption && (
                <motion.p
                  className={cn(
                    "text-center mt-8 lg:text-2xl text-lg font-medium",
                    inter.className
                  )}
                >
                  You were ranked{" "}
                  <span
                    className={cn(
                      garamond.className,
                      "font-bold lg:text-4xl text-3xl mx-1"
                    )}
                  >
                    {ordinalSuffixOf(wrappedData.last_month_overall_rank)}
                  </span>{" "}
                  out of{" "}
                  <span
                    className={cn(
                      garamond.className,
                      "font-bold lg:text-4xl text-3xl mx-1"
                    )}
                  >
                    {wrappedData.total_users}
                  </span>{" "}
                  Collectiv users!
                </motion.p>
              )}
            </>
          )}
        </AnimatePresence>
        {showRankCaption && (
          <motion.button
            onClick={() => {
              const main = document.getElementById("wrapped-main")!;
              main.scrollTo({
                behavior: "smooth",
                top: main.scrollHeight,
                left: 0,
              });
            }}
            className="absolute bottom-20 flex items-center gap-2 font-bold"
          >
            <motion.div
              animate={{ y: [-5, 5, -5, 5] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <BsArrowDown className="text-lg" />
            </motion.div>
            Share this with your friends!
          </motion.button>
        )}
      </motion.div>
      {showRankCaption && (
        <div className="h-screen min-h-[800px] flex flex-col lg:flex-row bg-primary-50 relative overflow-hidden">
          <div
            className={cn(
              garamond.className,
              "tracking-wide font-bold self-center text-4xl md:text-5xl mt-4 md:ml-auto md:mr-8 lg:ml-0 lg:mr-0 lg:absolute lg:right-4 lg:bottom-4 lg:text-6xl"
            )}
          >
            #MyCollectivMonth
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-5">
            <CollectivLogo
              color={COLORS.primary[500]}
              dimensions={{
                width: windowWidth,
                height: windowWidth,
              }}
            />
          </div>
          <div className="h-2/3 lg:w-1/2 lg:h-full flex flex-col">
            <div className="flex flex-col md:flex-row lg:flex-col h-1/2 items-center md:justify-center justify-center lg:gap-0 md:gap-8 md:p-4 px-2">
              <div>
                <RankMeter
                  className="lg:!w-[260px] lg:!h-[260px] md:!w-[200px] md:!h-[200px] !w-[150px] !h-[150px]"
                  classNameText="!text-2xl md:!text-3xl lg:!text-4xl"
                  isStatic
                  rank={wrappedData.last_month_overall_rank}
                  responsiveBorder
                />
              </div>
              <p
                className={cn(
                  "text-center mt-4 lg:text-2xl md:text-xl text-sm font-medium",
                  inter.className
                )}
              >
                You were ranked{" "}
                <span
                  className={cn(
                    garamond.className,
                    "font-bold lg:text-4xl md:text-3xl text-xl mx-1"
                  )}
                >
                  {ordinalSuffixOf(wrappedData.last_month_overall_rank)}
                </span>{" "}
                out of{" "}
                <span
                  className={cn(
                    garamond.className,
                    "font-bold lg:text-4xl md:text-3xl text-xl mx-1"
                  )}
                >
                  {wrappedData.total_users}
                </span>{" "}
                Collectiv users!
              </p>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-col h-1/2 md:items-center md:justify-center items-center p-4">
              <p
                className={cn(
                  garamond.className,
                  "text-2xl md:text-3xl lg:text-4xl text-center w-full md:w-1/2 lg:w-full mb-2"
                )}
              >
                Your top ten contributions
              </p>
              <div
                className={cn(
                  "h-full lg:w-full md:w-1/2 w-full md:pb-0 pb-4",
                  !contributions.length && "flex items-center"
                )}
              >
                {contributions.length > 0 && (
                  <ResponsiveContainer
                    className={"grow"}
                    width="100%"
                    height="100%"
                  >
                    <BarChart
                      margin={{ left: 0, top: 0, right: 100, bottom: 15 }}
                      layout="vertical"
                      data={contributions}
                    >
                      <YAxis dataKey="name" type="category" hide />
                      <XAxis type="number" dataKey={"value"} hide />
                      <Bar maxBarSize={200} dataKey={"value"} fill="fill">
                        <LabelList
                          position={"right"}
                          dataKey={"caption"}
                          fill="black"
                          width={100}
                          style={{
                            fontWeight: "bold",
                            fontFamily: inter.style.fontFamily,
                            fontSize: "clamp(10px, 1.5vw, 18px)",
                          }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
                {!contributions.length && (
                  <p className={cn(garamond.className, "text-xl")}>
                    You have <strong>no contributions yet</strong> this month.
                    Don&apos;t worry, What truly matters is your willingness and
                    enthusiasm to get involved and make a difference!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="h-1/3 md:h-full lg:w-1/2 w-full grow relative overflow-hidden">
            {/** Activity */}
            {windowWidth >= 1024 && (
              <FallingActivities wrappedData={wrappedData} uptoInView />
            )}
            {windowWidth < 1024 && (
              <SlidingActivities wrappedData={wrappedData} />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

const WrappedPage = () => {
  const { user } = useAppContext();
  const wrappedData = useQuery({
    queryKey: ["wrapped", user?.uid],
    queryFn: async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const monthlyWrap = await getRequest({
        token,
        endpoint: "/user/monthly-wrap",
      });
      return monthlyWrap as WrappedData;
    },
  });

  if (!wrappedData.data) return <Loading />;

  return <WrappedComponent wrappedData={wrappedData.data} />;
};

WrappedPage.auth = true;
export default WrappedPage;
